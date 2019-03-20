import { ADDRESS_FULL } from './address';

export const EMPLOYEES = `
  id
  name
  friends { id name }
`.replace(/\s+/g, ' ');

export const COMPANY_BASIC1 = `
  id
  name
`.replace(/\s+/g, ' ');

export const COMPANY_BASIC2 = `
  ${COMPANY_BASIC1}
  image
  color
`.replace(/\s+/g, ' ');

export const COMPANY_FULL = `
  id
  name
  color
  image
  address { ${ADDRESS_FULL} }
  employees { ${EMPLOYEES} }
`.replace(/\s+/g, ' ');

// SAMPLE DATA
// --------------
// company: {
//   "id":"60d09218-a979-452f-a0fd-42b9276978af", (uuid.V4 or base62)
//   "color":"#3e7f2d",
//   "image":"http://lorempixel.com/640/480/business",
//   "name":"Paucek, Conroy and Schiller",
//   "suffice":"Group",
//   "catchPhrase":"Fully-configurable 4th generation algorithm",
//   "bs":"24/7 disintermediate content",
//   "address":{
//     "zipCode":"00068-5262",
//     "city":"Lindgrenberg",
//     "cityPrefix":"West",
//     "citySuffix":"mouth",
//     "streetName":"Emmett Mall",
//     "streetAddress":"4327 Kamille Villages",
//     "streetSuffix":"Expressway",
//     "streetPrefix":"b",
//     "secondaryAddress":"Suite 872",
//     "county":"Berkshire",
//     "country":"South Georgia and the South Sandwich Islands",
//     "state":"Idaho",
//     "latitude":"-67.9188",
//     "longitude":"-78.0666"
//   }
// }
