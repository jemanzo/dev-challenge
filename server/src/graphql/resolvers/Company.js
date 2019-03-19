import { getUser, getEmployees } from '../../helpers';

export default {
  employees: async (root, args, { ctx }, info) => {
    // const employees = getEmployees(root.id);
    // // employees will be an array of just user ids.

    // let results;
    // if (employees) {
    //   // lets turn that into actual user data.
    //   results = employees.map(id => getUser(id));
    // }

    // return results || [];
    return getEmployees(root.id);
  }
};
