import mongoose from "mongoose";

const leaseSchema = new mongoose.Schema({
  rent: {
    type: Number
  },
  extraCharges: {
    type: Number,
    default: 0
  },
  initialReading: {
    type: Number
  },
  current: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  },
  remark: {
    type: String
  },
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: "Landlord" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }]
});

const Lease =  mongoose.models.Lease || mongoose.model("Lease", leaseSchema);

export default Lease;
