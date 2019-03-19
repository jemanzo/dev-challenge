import { users } from '../model';

export default async function getUser(keyOrID) {
  return users.get(keyOrID);
}
