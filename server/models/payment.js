import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  reading: {
    type: Number
  },
  electricityCharges: {
    type: Number,
    default: 0
  },
  paidElectricityCharges: {
    type: Number,
    default: 0
  },
  totalPaid: {
    type: Number
  },
  balance: {
    type: Number
  },
  remark: {
    type: String
  },
  datePaid: {
    type: Date,
    default: Date.now
  },
  // landlord: { type: mongoose.Schema.Types.ObjectId, ref: "Landlord" }
});

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
