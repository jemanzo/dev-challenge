import { companies } from '../model';

export default function getCompany(keyOrID) {
  return companies.get(keyOrID);
}
