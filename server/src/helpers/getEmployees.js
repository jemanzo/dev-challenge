import { users, filterEmployees } from '../model';

export default function getEmployees(companyID) {
  return filterEmployees(companyID).map(user => {
    return { ...user, id: users.ensureKey(user.id) };
  });
}
