export default {
  Query: {
    lease: async (parent, { _id }, { models }) => {
      return await models.Lease.findOne({ _id: _id }).populate("tenant");
    },
    leases: async (parent, { _id }, { models }) => {
      const room = await models.Room.findOne({ _id: _id });
      // Wrong
      return room.leases;
    }
  },
  Mutation: {
    createTenantWithLease: async (parent, { lease, tenant }, { models }) => {
      const newTenant = await models.Tenant.create(tenant);
      console.log("newTenant ==>", newTenant); // TODO: remove this
      const newLease = await models.Lease.create({
        ...lease,
        current: true,
        tenant: newTenant._id
      });
      console.log("newLease ==>", newLease); // TODO: remove this
      let room = await models.Room.findOneAndUpdate(
        { _id: lease.room },
        { $set: { currentLease: newLease._id } }
      );
      return newLease;
    },
    updateLease: async (parent, { _id, lease }, { models }) => {
      return await models.Lease.findOneAndUpdate({ _id: _id }, lease, {
        new: true
      });
    }
  }
};
