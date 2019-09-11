import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNo: {
    type: String,
    required: true
  },
  leases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lease" }]
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
