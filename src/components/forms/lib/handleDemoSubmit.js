// @flow

import { FORM_STATUSES, isFieldMissing, isValidEmail, track } from '../../../helpers';

import type { FormValues, ParsedFormValues } from './formTypes';
import { submitToHubspot } from './hubspot';
import {
  deerCompanyUrl,
  investorUrl,
  fundUrl,
  COMPANY,
  EMPLOYEE_VALUE,
  INVESTMENT_VALUE,
  DEER_COMPANY_THRESHOLD,
  FUND_INVESTMENT_THRESHOLD,
  smallCompanyUrl,
} from './constants';

type Error = {
  errorType: string,
  message: string,
};

type JsonResponse = {
  errors: Error[],
};

const { INVALID_EMAIL, INVALID_FIELDS, LOADING, SUBMITTED, FETCH_ERROR } = FORM_STATUSES;

const isInvalidEmailError = (errors: Error[]): boolean =>
  errors.some((error) => error.errorType === 'INVALID_EMAIL');

const isDeerCompany = (size: number) => size >= DEER_COMPANY_THRESHOLD;
const isFund = (size: number) => size >= FUND_INVESTMENT_THRESHOLD;

const getEmployeeValue = (size: number) => {
  if (isDeerCompany(size)) return size * EMPLOYEE_VALUE;
  return 0;
};
const getInvestmentValue = (size: number) => {
  if (isFund(size)) return size * INVESTMENT_VALUE;
  return 0;
};

const getPipelineValue = (size: number, isCompany: boolean) =>
  isCompany ? getEmployeeValue(size) : getInvestmentValue(size);

const getUrl = ({ isCompany, size }: ParsedFormValues) => {
  if (!isCompany) {
    return isFund(size) ? fundUrl : investorUrl;
  }
  return isDeerCompany(size) ? deerCompanyUrl : smallCompanyUrl;
};

const redirect = (values: ParsedFormValues) => {
  if (window) {
    window.location = getUrl(values);
  }
};

export const handleDemoSubmit = async ({
  values,
  event,
  setFormStatus,
}: {|
  values: FormValues,
  event: SyntheticInputEvent<HTMLInputElement>,
  setFormStatus: (FormStatus) => void,
|}): Promise<void> => {
  event.preventDefault();
  setFormStatus(LOADING);
  const { requesterType, email, size: sizeString } = values;

  if (isFieldMissing({ requesterType, sizeString })) {
    setFormStatus(INVALID_FIELDS);
    return;
  }

  if (!isValidEmail(email)) {
    setFormStatus(INVALID_EMAIL);
    return;
  }

  const isCompany = requesterType === COMPANY;
  const size = Number(sizeString);
  const value = getPipelineValue(size, isCompany);
  const parsedFormValues = { isCompany, email, size, value };

  const response = await submitToHubspot(parsedFormValues);

  if (response.status !== 200) {
    const jsonResponse: JsonResponse = await response.json();
    if (isInvalidEmailError(jsonResponse.errors)) {
      setTimeout(() => {
        setFormStatus(INVALID_EMAIL);
      }, 1000);
      return;
    }
    setTimeout(() => {
      setFormStatus(FETCH_ERROR);
    }, 1000);
    // TODO: replace with send to sentry helper `error(response.statusText)`
    throw new Error(response.statusText);
  }

  const eventName = `getDemo.submit.${requesterType}`;
  track(eventName, { value });

  redirect(parsedFormValues);
  setFormStatus(SUBMITTED);
};
