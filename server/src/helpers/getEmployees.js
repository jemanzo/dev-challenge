import { users, filterEmployees } from '../model';

export default async function getEmployees(companyID) {
  return filterEmployees(companyID).map(user => {
    return { ...user, id: users.ensureKey(user.id) };
  });
}
