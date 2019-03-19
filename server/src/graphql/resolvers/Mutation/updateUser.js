import { setUser } from '../../../helpers';

export default async function User(root, { user }, { ctx }, info) {
  // todo: 1(done!). this throws a unfriendly (and potentially unsafe) error if a non-existnant user ID is entered.
  // how can we check for a non-existing user id and throw a more friendly error.

  // todo: 2(done!). why is this update overwriting existing user data? Need to fix this so that just data input is
  // updated rather than overwritting all the data.

  try {
    await setUser(user);
  } catch (error) {
    throw new Error(`unable to update user ${user && user.id}`);
  }

  return true;
}
