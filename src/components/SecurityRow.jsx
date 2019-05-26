// @flow

import * as React from 'react';
import { Trans } from '@lingui/react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faLock } from '@fortawesome/free-solid-svg-icons';

import { ChevronRight } from '../layouts/utils';

export default (props: Props) => (
  <div className="row gap-y text-center my-5">
    <div className="col-md-6 col-xl-5 offset-xl-1">
      <FontAwesomeIcon icon={faShieldAlt} className="text-primary mb-2" size="3x" />
      <h5>
        <Trans>Privacy made in Europe</Trans>
      </h5>
      <p>
        <Trans>Because your equity data is not for everyone</Trans>
        <br />
        <Link href to={`${props.prefix}/privacy/`}>
          <Trans>Read more</Trans>
          <ChevronRight />
        </Link>
      </p>
    </div>

    <div className="col-md-6 col-xl-5">
      <FontAwesomeIcon icon={faLock} className="text-primary mb-2" size="3x" />
      <h5>
        <Trans>Your data is safe with us</Trans>
      </h5>
      <p>
        <Trans>Enjoy the highest security standards</Trans>
        <br />
        <Link href to={`${props.prefix}/security/`}>
          <Trans>Read more</Trans>
          <ChevronRight />
        </Link>
      </p>
    </div>
  </div>
);
