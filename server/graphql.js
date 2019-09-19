// import express from "express";
// import cors from "cors";
import models, { connectDb } from "./models";
import { ApolloServer, AuthenticationError } from "apollo-server-lambda";
import jwt from "jsonwebtoken";
import "dotenv/config";

import schema from "./schema";
import resolvers from "./resolvers";

// const app = express();
// app.use(cors());

const getMe = async headers => {
  // console.log("headers ==>", headers); // TODO: remove this
  const token = headers["x-token"];
  console.log("token ==>"); // TODO: remove this
  if (token && token != "null") {
    try {
      const me = await jwt.verify(token, process.env.SECRET);
      return await models.User.findOne({ _id: me._id });
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

// exports.handler = server.createHandler({
//   cors: {
//     origin: true,
//     credentials: true
//   }
// });

// export async function handler(event, context) {
//   await connectDb();
//   return server.createHandler({
//     cors: {
//       origin: true,
//       credentials: true
//     }
//   });
// }
const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  context: async ({ event, context }) => {
    const me = await getMe(event.headers);
    console.log("me ==>", me); // TODO: remove this

    return {
      event,
      headers: event.headers,
      models,
      me,
      context
    };
  }
});

let conn = null;

export async function handler(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;

  // const db = await connectDb();
  conn = await connectDb(conn);

  console.log("connected ==>"); // TODO: remove this

  return new Promise((yay, nay) => {
    const cb = (err, args) => (err ? nay(err) : yay(args));
    server.createHandler({
      cors: {
        origin: true,
        credentials: true
      }
    })(event, context, cb);
  });
}

// server.createHandler({
//   cors: {
//     origin: true,
//     credentials: true
//   }
// });

// export async function handler() {
//   return await connectDb().then(async () => {
//     return server.createHandler({
//       cors: {
//         origin: true,
//         credentials: true
//       }
//     });
//   });
// }

// server.applyMiddleware({ app, path: "/graphql" });

// connectDb().then(async () => {
//   app.listen(process.env.PORT, () =>
//     console.log(`Server listening on port ${process.env.PORT}!`)
//   );
// });
