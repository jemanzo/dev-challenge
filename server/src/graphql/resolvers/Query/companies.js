import { getCompanies } from '../../../helpers';

export default async function companies(root, args, { ctx }, info) {

  const { name, first, after } = args;

  if (first < 0) {
    throw new UserInputError('First must be positive');
  }

  const keywords =
    name &&
    name
      .replace(/,+|\s+/g, ' ') // things to be ignored (whitespace, comma)
      .replace('  ', ' ') // remove double spaces
      .trim()
      .toLowerCase()
      .split(' ');

  return getCompanies(
    company => {
      if (keywords) {
        // filtering by keywords
        // "company.name" must contain all keywords
        const compName = company.name.toLowerCase();
        for (let i = 0; i < keywords.length; i++) {
          if (compName.indexOf(keywords[i]) < 0) {
            return false;
          }
        }
      }
      return true;
    },
    { first, after }
  );
}
