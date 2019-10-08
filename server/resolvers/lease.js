import { ApolloError  } from "apollo-server";

export default {
  Query: {
    lease: async (parent, { _id }, { models }) => {
      return await models.Lease.findOne({ _id: _id }).populate("tenant");
    },
    leases: async (parent, { _id }, { models }) => {
      const room = await models.Room.findOne({ _id: _id });
      // Wrong
      return room.leases;
    },
    currentLeases: async (parent, {}, { models, me }) => {
      const leases = await models.Lease.aggregate([
        { $match: { landlord: me.landlord, current: true } },
        {
          $lookup: {
            from: "payments",
            as: "payment",
            let: { paymentsId: "$payments" },
            pipeline: [
              {
                $match: {
                  $expr: { $in: ["$_id", "$$paymentsId"] }
                }
              },
              { $sort: { datePaid: -1 } },
              { $limit: 1 }
            ]
          }
        },
        {
          $lookup: {
            from: "rooms",
            localField: "room",
            foreignField: "_id",
            as: "room"
          }
        },
        {
          $lookup: {
            from: "tenants",
            localField: "tenant",
            foreignField: "_id",
            as: "tenant"
          }
        },
        { $unwind: "$room" },
        { $unwind: "$tenant" },
        {
          $addFields: {
            lastPayment: { $arrayElemAt: ["$payment", 0] }
          }
        }
      ]);
      console.log("leases", leases);
      return leases;
    }
  },
  Mutation: {
    createTenantWithLease: async (
      parent,
      { lease, tenant },
      { models, me }
    ) => {
      const newTenant = await models.Tenant.create(tenant);
      const newLease = await models.Lease.create({
        ...lease,
        current: true,
        landlord: me.landlord,
        tenant: newTenant._id
      });
      let room = await models.Room.findOneAndUpdate(
        { _id: lease.room },
        { $set: { currentLease: newLease._id } }
      );
      console.log("room", room);
      return newLease;
    },
    updateLease: async (parent, { _id, lease }, { models }) => {
      return await models.Lease.findOneAndUpdate({ _id: _id }, lease, {
        new: true
      });
    },
    endLease: async (parent, { _id }, { models }) => {
      // 1. Update the lease -> Set current as false
      // 2. Update the room -> Set currentLease as null
      try {
        const lease = await models.Lease.findOneAndUpdate(
          { _id: _id },
          { $set: { current: false } },
          {
            new: true
          }
        );
        await models.Room.findOneAndUpdate(
          { _id: lease.room },
          { $set: { currentLease: null } }
        );
        return lease;
      } catch (e) {
        return new ApolloError(e, 500);
      }
    }
  }
};
