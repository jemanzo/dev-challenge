import { ApolloServer } from 'apollo-server-koa';
import schema from './schema';

export default new ApolloServer({
  schema,
  context: async ({ ctx }) => {
    return { ctx };
  },
  formatError: error => {
    if (error.extensions && error.extensions.code === 'BAD_USER_INPUT') {
      return {
        message: error.message,
        ...error.extensions
      };
    } else {
      console.error(error);
      return {
        message: 'Internal server error',
        code: 'SERVER_ERROR'
      };
    }
  },
  tracing: false,
  debug: false // another way is setting NODE_ENV environment variable to ‘production’ or ‘test’
});
