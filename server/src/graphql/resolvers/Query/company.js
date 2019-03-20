import { UserInputError } from 'apollo-server-koa';
import { getCompany } from '../../../helpers';

export default async function company(root, { id }, { ctx }, info) {
  console.log(`query company: ${id}`);
  const company = getCompany(id);
  if (!company) {
    throw new UserInputError(`company not found`, { id });
  }
  return company;
}
