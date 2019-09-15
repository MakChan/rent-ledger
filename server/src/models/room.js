import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNo: {
    type: String,
    required: true
  },
  landlordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Landlord"
  }
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
