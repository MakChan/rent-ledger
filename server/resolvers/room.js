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
    rooms: async (parent, {}, { models, me }) => {
      const roooms = await models.Room.find({ landlordId: me.landlord })
        .populate("currentLease")
        .populate({
          path: "currentLease",
          populate: {
            path: "tenant"
          }
        });
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
    ),
    createMultipleRooms: combineResolvers(
      isAuthenticated,
      async (parent, { rooms }, { models, me }) => {
        rooms = rooms
          .filter(room => room.roomNo)
          .map(room => ({ roomNo: room.roomNo, landlordId: me._id }));
        return await models.Room.insertMany(rooms);
      }
    )
  }
};
