import { getEmployees } from '../../helpers';

export default {
  employees: async (root, args, { ctx }, info) => {
    return getEmployees(root.id);
  }
};
