import { ADDRESS_FULL } from './address';
import { COMPANY_FULL } from './company';

export const USER_BASIC1 = `
  id
  name
`.replace(/\s+/g, ' ');

export const USER_BASIC2 = `
  ${USER_BASIC1}
  email
  image
  color
`.replace(/\s+/g, ' ');

export const USER_FULL = `
  id
  name
  email
  image
  color
  address { ${ADDRESS_FULL} }
  company { ${COMPANY_FULL} }
  friends { ${USER_BASIC1} }
`.replace(/\s+/g, ' ');
