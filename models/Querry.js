const mongoose = require("mongoose");

const querrySchema = new mongoose.Schema(
  {
    querryUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    querrySubject: { type: String, required: true },
    querryDetails: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Querry", querrySchema);
