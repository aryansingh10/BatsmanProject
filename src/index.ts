import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './graphql/schema';
import { resolvers } from './graphql/resolvers';

async function init() {
   const app = express();

   app.use(express.json());
   const gqlServer = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers
   });
   await gqlServer.start();

   app.use(
      '/graphql',
      expressMiddleware(gqlServer) as unknown as express.RequestHandler<
         Request,
         Response
      >
   );

   app.listen(3000, () => {
      console.log('Server started on http://localhost:3000');
   });
}

init();
