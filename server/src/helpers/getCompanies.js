import { companies } from '../model';

export default function getCompanies(filter, { first, after }) {

  const filtered = companies.filter(filter)
  const totalCount = filtered.length;

  after = companies.ensureKey(after);
  let limit = (Number.isInteger(first) && first > 0)
    ? first
    : totalCount

  let start
  if (after) {
    for (let i = 0; i < filtered.length; i++) {
      const item = filtered[i] // item => [key, value]
      if (item[0] === after) {
        start = i + 1;
        break;
      }
    }
  } else {
    start = 0
  }
  let hasNextPage = limit && limit < (filtered.length - start)

  const edges = filtered
    .slice(start, start + limit)
    .map(item => {
      return {
        cursor: item[0],
        node: { ...item[1] }
      }
    })

  let endCursor = edges[edges.length -1]
  if (endCursor) { endCursor = endCursor.cursor }

  return {
    count: edges.length,
    totalCount,
    pageInfo: {
      endCursor,
      hasNextPage
    },
    edges
  }
}


