// @flow

import React from 'react';
import Img from 'gatsby-image';
import { Trans } from '@lingui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons';
import { targetBlank } from '../../layouts/utils';

export const PartnerCard = (props: { logo: Object, email: string, website: string }) => {
  const { logo, email, website } = props;
  return (
    <div
      className="partner-card card border shadow-8 col-12 col-md-3 p-4 mx-auto mb-6 text-center"
      key={website}
    >
      <div className="h-70 row m-auto align-content-center">
        <Img {...logo} alt={website} height={100} />
      </div>

      <div className="h-20 d-flex justify-content-around pt-2">
        <a
          className="align-content-center"
          href={`mailto:${email}?subject=Inquiry from Ledgy Partner Page`}
          {...targetBlank}
        >
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          <Trans>Email</Trans>
        </a>
        <a href={website} {...targetBlank}>
          <FontAwesomeIcon icon={faLink} className="mr-2" />
          <Trans>Website</Trans>
        </a>
      </div>
    </div>
  );
};