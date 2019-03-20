import { UserInputError } from 'apollo-server-koa';
import { getUser } from '../../../helpers';

export default function user(root, { id }, { ctx }, info) {
  console.log(`query user: ${id}`);
  const user = getUser(id);
  if (!user) {
    throw new UserInputError(`user not found`, { id });
  }
  return user;
}
