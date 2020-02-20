// @flow

import Img from 'gatsby-image';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faMoneyBillAlt,
  faUserFriends,
  faIndustry,
  faSeedling
} from '@fortawesome/free-solid-svg-icons';

import { LongText } from '../LongText';
import { DynamicTrans } from '../DynamicTrans';

const getCompanySummaries = (company: Company) => [
  [faClock, 'Founded year', `Founded in ${company.yearFounded}`],
  [faMoneyBillAlt, 'Funding', company.funding ? `${company.funding} in Funding` : ''],
  [faUserFriends, 'Employees count', `${company.employeeCount} Employees`],
  [faIndustry, 'Sector', company.sector],
  [faSeedling, 'Stage', company.stage]
];

export const CompanySummary = ({ company }: {| company: Company |}) => (
  <div className="company-summary rounded-md bg-white sticky-top p-5">
    <Img
      className="company-summary-logo font-weight-light fit-cover mx-auto mb-3"
      {...company.logo}
    />
    <div className="container">
      <LongText
        content={company.mainQuote}
        isMarkdown={false}
        className="company-summary-quote mb-0 text-left"
      />
      <div className="company-summary-contact mb-2">
        <div className="row mx-auto">
          <strong>{company.contactName}</strong>
        </div>
        <div className="row mx-auto">
          <DynamicTrans>{company.contactTitle}</DynamicTrans>
        </div>
      </div>
      {getCompanySummaries(company).map(
        ([icon, iconTitle, description]) =>
          description && (
            <div key={iconTitle} className="row mx-auto py-3">
              <FontAwesomeIcon
                fixedWidth
                size="lg"
                icon={icon}
                title={iconTitle}
                className="mr-4"
              />
              {description}
            </div>
          )
      )}
    </div>
  </div>
);
