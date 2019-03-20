import { users } from '../model';

export default function getUser(keyOrID) {
  return users.get(keyOrID);
}
