import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "./authorization";

export default {
  Query: {
    room: async (parent, { _id }, { models }) => {
      return await models.Room.findOne({ _id: _id });
    },
    leases: async (parent, { _id }, { models }) => {
      const room = await models.Room.findOne({ _id: _id }).populate("leases");
      return room.leases;
    },
    rooms: async (parent, { _id }, { models }) => {
      return await models.Room.find({ landlordId: _id });
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
