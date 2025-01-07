const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  aadhar: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String }, // URL for profile picture
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
