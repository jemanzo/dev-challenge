import { users } from '../model';

export default async function setUser(user) {
  return users.save(user);
}
