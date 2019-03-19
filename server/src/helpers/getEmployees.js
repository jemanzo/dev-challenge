import { filterEmployees } from '../model';

export default async function getEmployees(companyID) {
  return filterEmployees(companyID);
}
