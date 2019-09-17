import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "./authorization";

export default {
  Query: {
    room: async (parent, { _id }, { models }) => {
      return await models.Room.findOne({ _id: _id }).populate("currentLease");
      // const currentLease = await models.Lease.findOne({
      //   room: room._id,
      //   current: true
      // });
      // room.lease = currentLease;
      // return room;
    },
    rooms: async (parent, { _id }, { models }) => {
      const roooms = await models.Room.find({ landlordId: _id })
        .populate("currentLease")
        .populate({
          path: "currentLease",
          populate: {
            path: "tenant"
          }
        });
      console.log("roooms ==>", roooms); // TODO: remove this
      return roooms;
    }
  },

  Mutation: {
    createRoom: combineResolvers(
      isAuthenticated,
      async (parent, { roomNo }, { models, me }) => {
        return await models.Room.create({
          roomNo,
          landlordId: me._id
        });
      }
    )
  }
};
