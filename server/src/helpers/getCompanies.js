import { companies } from '../model';

export default async function getCompanies(filter, paging) {
  return companies.getAll(filter, paging);
}
