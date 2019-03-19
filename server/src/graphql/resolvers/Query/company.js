import { getCompany } from '../../../helpers';

export default async function company(root, { id }, { ctx }, info) {
  console.log(`query company: ${id}`);
  return getCompany(id);
}
