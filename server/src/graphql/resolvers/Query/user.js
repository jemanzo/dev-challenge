import { getUser } from '../../../helpers';

export default async function user(root, { id }, { ctx }, info) {
  console.log(`query user: ${id}`);
  return getUser(id);
}
