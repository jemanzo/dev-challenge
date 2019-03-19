import { users } from '../model';

export default async function getUsers(filter, paging) {
  return users.getAll(filter, paging);
}
