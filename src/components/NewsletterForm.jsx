// @flow

import React, { Component } from 'react';
import { Trans } from '@lingui/react';
import 'isomorphic-fetch';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { navigate } from 'gatsby';

import { trackSignup, mixpanelUrl } from '../layouts/utils';

declare type FormStatus = {| status: 'idle' | 'loading' | 'invalid' | 'error' |};
const IDLE = 'idle';
const LOADING = 'loading';
const INVALID = 'invalid';
const ERROR = 'error';

const MIXPANEL_TOKEN = '258b9724a7ad7271dd2e3e3440bb68fd';
// check for isNetlify and use production vs dev token

const generateBase64EncodedJSON = (email, token) => {
  const mixpanelObject = {
    $token: token,
    $distinct_id: email,
    $set: {
      $first_name: email,
      $email: email
    }
  };
  return btoa(JSON.stringify(mixpanelObject));
};

const generateMixpanelUrl = data => `${mixpanelUrl}/engage/?data=${data}`;

const removeModalFromDOM = () => {
  const modal = document.getElementById('newsletter-signup');
  if (modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('style', 'display: none');
  }
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop && backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
};

export default class extends Component<Props, { email: string, ...FormStatus }> {
  state = { email: '', status: IDLE };
  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ email: e.target.value, status: IDLE });
  };
  handleSubmit = async (e: any) => {
    e.preventDefault();
    this.setState({ status: LOADING });
    const { email } = this.state;
    const valid = this.re.test(email);
    if (valid) {
      const mixpanelJSON = generateBase64EncodedJSON(email, MIXPANEL_TOKEN);
      const url = generateMixpanelUrl(mixpanelJSON);
      try {
        const response = await fetch(url);
        // second fetch to create an event (action the user takes)
        // user.workflowBetaRequest
        // user.newsletterSignup for regular newsletter signup
        if (response.status === 200) {
          trackSignup('newsletter');
          this.setState({ email: '', status: IDLE });
          removeModalFromDOM();
          navigate('/subscribed');
        } else {
          this.setState({ status: ERROR });
        }
      } catch (error) {
        this.setState({ status: ERROR });
      }
    } else {
      this.setState({ status: INVALID });
    }
  };
  render = () => {
    const { props, state } = this;
    const { status } = state;
    const { i18n } = props;
    const invalid = status === INVALID;
    const error = status === ERROR;
    const loading = status === LOADING;
    return (
      <>
        <form method="post" className="input-round py-4" onSubmit={this.handleSubmit} noValidate>
          <div className="form-group input-group bg-white p-2 my-4 position-relative">
            <input
              type="email"
              name="EMAIL"
              className="form-control"
              placeholder={i18n.t`Enter your email…`}
              onChange={this.handleChange}
              value={this.state.email}
            />
            <button
              type="submit"
              name="subscribe"
              className="btn btn-primary btn-round btn-xl ml-2"
              disabled={invalid || error || loading}
              style={{ minWidth: '110px' }}
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-lg spin" />
              ) : (
                <Trans>Subscribe</Trans>
              )}
            </button>
            <small className="text-danger position-absolute form-error-message">
              {invalid && <Trans>Oops. This email address is invalid.</Trans>}
              {error && <Trans>Oops. Something went wrong, please try again.</Trans>}
            </small>
          </div>
        </form>
      </>
    );
  };
}
