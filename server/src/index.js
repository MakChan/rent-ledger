import express from "express";
import cors from "cors";
import models, { connectDb } from './models';
import { ApolloServer } from "apollo-server-express";
import 'dotenv/config';

import schema from "./schema";
import resolvers from "./resolvers";
import models from "./models";

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1]
  }
});

server.applyMiddleware({ app, path: "/graphql" });

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});
