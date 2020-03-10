// @flow

export const name = 'Ledgy';

// external URLs
export const appUrl = 'https://app.ledgy.com';

export const demoUrl = 'https://demo.ledgy.com';

export const supportUrl = 'https://support.ledgy.com';

export const calculatorUrl = 'https://calculator.ledgy.com';

export const githubUrl = 'https://github.com/morloy/ledgy.com/';

// netlify & mixpanel
const isNetlify = typeof window !== 'undefined' && window.location.hostname !== 'localhost';

export const MIXPANEL_TOKEN = isNetlify
  ? '258b9724a7ad7271dd2e3e3440bb68fd'
  : '7f124dd9a799a7c687dc38ee554d9876';

// form states
export const FORM_STATES = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  SUBMITTED: 'submitted',
  INVALID: 'invalid',
  INVALID_EMAIL: 'invalid-email',
  INVALID_FIELDS: 'invalid-fields'
});

// plan names
export const LEDGY_PLANS = Object.freeze({
  STARTUP: 'Startup',
  SCALEUP: 'Premium', // will be named Scaleup soon
  ENTERPRISE: 'Enterprise'
});

// company sizes
export const COMPANY_SIZES = ['1–10', '11–50', '51–100', '101–250', '251+'];
export const SMALL_COMPANY_SIZES: string[] = COMPANY_SIZES.slice(0, 2);

// email validation
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
export const isValidEmail = (email: string) => EMAIL_REGEX.test(email);

// misc
export const isBrowser = typeof window !== 'undefined';
export const isDevelopment = isBrowser && window.location.hostname === 'localhost';

export const targetBlank = { target: '_blank', rel: 'noopener noreferrer' };
