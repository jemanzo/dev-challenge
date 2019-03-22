import { getUsers } from '../../../helpers';

export default async function users(root, args, { ctx }, info) {
  // todo: 3(done!). can we accept a input variable into the graphql query to only show certain users? Maybe allowing
  //  filter by name to begin with.
  // ********
  //  1. typeof name === "undefined":
  //      - will return all users
  //  2. typeof name === "string":
  //      - "name" will be converted into an array of keywords
  //      - all keywords must be found in "user.name"
  //      - example: "Sr. Schmitt, Elroy" matchs "Elroy Schmitt Sr."
  //  Some other ways of doing this kind of filter could be:
  //      - exact match where "name.toLowerCase() === user.name.toLowerCase()"
  //      - using regular expression like "user.name.match(RegExp(name,'gi'))",
  //        but it's very insecure (ReDOS Attacks)
  //
  // P.S.: For security reasons, in a production environment, all GraphQL queries
  //       received by this server should be pre-hashed and pre-approved.
  //       A GraphQL Reverse Proxy should be used to filter unexpected queries!
  // ********

  // todo: 5(done!). getting this list of all users is slow.  Would be really cool if it could return all the users
  //  in a more performant way.  Keeping in mind that the underlaying JSON files may get updated.
  // ********
  //   - the file system access responsibility was transferred to an auxiliary function
  //   - a read(2) syscall is always expensive, in any O.S., and doing it synchronously is the worst case scenario
  //   - the best solution is to maintain a synchronized cache of ".json" files. The memory consumption in this case
  //     is irrelevant compared to the performance gain. (see "src/model/dataset.js")
  // ********

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

  return getUsers(
    user => {
      if (keywords) {
        // filtering by keywords
        // "user.name" must contain all keywords
        const usrName = user.name.toLowerCase();
        for (let i = 0; i < keywords.length; i++) {
          if (usrName.indexOf(keywords[i]) < 0) {
            return false;
          }
        }
      }
      return true;
    },
    { first, after }
  );
}
