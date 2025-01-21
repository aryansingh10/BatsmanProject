import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import sequelize from './database/sequilize';

async function init() {
    const app = express();

    app.use(express.json());
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }

    // Apollo Server setup
    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await gqlServer.start();

    app.use('/graphql', expressMiddleware(gqlServer) as unknown as express.RequestHandler);

    app.listen(3000, () => {
        console.log('Server started on http://localhost:3000/graphql');
    });
}

init();
