import { getCompany } from '../../../helpers';

export default async function company(root, { id }, { ctx }, info) {
  console.log(`quering company: ${id}`);
  return getCompany(id);
}
