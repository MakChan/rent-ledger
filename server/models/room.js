import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNo: {
    type: String,
    required: true
  },
  landlordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Landlord"
  },
  currentLease: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lease"
  }
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;
