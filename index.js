import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import graphqlHTTP from 'express-graphql';

import graphQLSchema from './graphql/schema/index';
import graphQLResolvers from './graphql/resolvers/index';
import isAuth from './middleware/is-auth';

const connectMongo = async () => {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mycluster-ghzun.mongodb.net/test?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    const mongo = await client.connect();
    return mongo.db(process.env.MONGO_DB);
  } catch (err) {
    return err;
  }
};

(async () => {
  // Connect to MongoDB
  const db = await connectMongo();
  if (db) {
    // Define MongoDB collections
    const collections = {
      Posts: db.collection('posts'),
      Users: db.collection('users'),
    };

    // Create Express application
    const app = express();

    app.use(bodyParser.json());

    // Use middleware for headers
    app.use((req, res, next) => {
      // Define allowed request origins
      res.setHeader('Access-Control-Allow-Origin', '*');
      // Define allowed request types
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      // Define allowed request headers
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      // Browser sends OPTIONS-requests to check if request its about to send is allowed by server
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
      return next();
    });

    // Use middleware for authorization
    app.use(isAuth);

    // Create GraphQL HTTP server
    app.use(
      '/graphql',
      graphqlHTTP((req) => ({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        context: { collections, req },
        graphiql: true,
      })),
    );

    // Define Express (GraphQL server) port
    const PORT = 3000;
    app.listen(PORT);
  }
})();
