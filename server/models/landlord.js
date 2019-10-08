import mongoose from "mongoose";

const landlordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }]
});

const Landlord = mongoose.models.Landlord || mongoose.model("Landlord", landlordSchema);

export default Landlord;
