export const ADDRESS_BASIC1 = `
  zipCode
  city
  state
  country
`.replace(/\s+/g, ' ');

export const ADDRESS_BASIC2 = `
  ${ADDRESS_BASIC1}
  latitude
  longitude
`.replace(/\s+/g, ' ');

export const ADDRESS_FULL = `
  zipCode
  city
  cityPrefix
  citySuffix
  streetName
  streetAddress
  streetSuffix
  streetPrefix
  secondaryAddress
  county
  country
  state
  latitude
  longitude
`.replace(/\s+/g, ' ');
