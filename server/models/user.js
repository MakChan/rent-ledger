import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 42
  },
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Landlord"
  }
});

userSchema.statics.findByLogin = async function(username) {
  const user = await this.findOne({
    username: username
  }).populate("landlord");
  return user;
};

userSchema.pre("save", async function() {
  this.password = await this.generatePasswordHash();
});

userSchema.methods.generatePasswordHash = async function() {
  const saltRounds = 10;
  return await bcrypt.hash(this.password, saltRounds);
};

userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
