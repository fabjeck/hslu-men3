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

    // Create GraphQL HTTP server
    app.use('/graphql', bodyParser.json(), isAuth, graphqlHTTP({
      schema: graphQLSchema,
      rootValue: graphQLResolvers,
      context: { collections },
      graphiql: true,
    }));

    // Define Express port
    const PORT = 3000;
    app.listen(PORT);
  }
})();
