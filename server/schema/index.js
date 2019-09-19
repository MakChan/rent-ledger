import { gql } from "apollo-server-lambda";

import userSchema from "./user";
import landlordSchema from "./landlord";
import leaseSchema from "./lease";
import paymentSchema from "./payment";
import tenantSchema from "./tenant";
import roomSchema from "./room";

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  userSchema,
  landlordSchema,
  leaseSchema,
  paymentSchema,
  tenantSchema,
  roomSchema
];
