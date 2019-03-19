import { companies } from '../model';

export default async function getCompany(keyOrID) {
  return companies.get(keyOrID);
}
