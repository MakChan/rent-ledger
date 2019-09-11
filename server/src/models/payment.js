import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  reading: {
    type: Number
  },
  electricityCharges: {
    type: Number
  },
  totalPaid: {
    type: Number
  },
  balance: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
