import mongoose from "mongoose";

import User from "./user";
import Landlord from "./landlord";
import Room from "./room";
import Lease from "./lease";
import Tenant from "./tenant";
import Payment from "./payment";

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const models = { User, Landlord, Room, Lease, Tenant, Payment };

export { connectDb };

export default models;
