import { companies } from '../model';

export default async function setCompany(company) {
  return companies.update(company);
}
