import mongoose from "mongoose";

const leaseSchema = new mongoose.Schema({
  rent: {
    type: Number,
    required: true
  },
  extraCharges: {
    type: Number
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
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }]
});

const Lease = mongoose.model("Lease", leaseSchema);

export default Lease;
