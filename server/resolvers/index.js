import { GraphQLDateTime } from "graphql-iso-date";

import userResolvers from "./user";
import landlordResolvers from "./landlord";
import roomResolvers from "./room";
import leaseResolvers from "./lease";
import tenantResolvers from "./tenant";
import paymentResolvers from "./payment";

const customScalarResolver = {
  Date: GraphQLDateTime
};

export default [
  customScalarResolver,
  userResolvers,
  landlordResolvers,
  roomResolvers,
  leaseResolvers,
  tenantResolvers,
  paymentResolvers
];
