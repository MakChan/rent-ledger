import { AsyncResource } from "async_hooks";

export default {
  Query: {
    landlord: async (parent, { _id }, { models }) => {
      return await models.Landlord.findOne({ _id: _id });
    },
    rooms: async (parent, { _id }, { models }) => {
      const landlord = await models.Landlord.findOne({ _id: _id }).populate(
        "rooms"
      );
      return landlord.rooms;
    }
  }
};
