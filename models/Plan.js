const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  planValue: { type: Number, required: true },
  planDuration: { type: String, required: true },
  planBanner: { type: String, required: true } // Image path
});

module.exports = mongoose.model("Plan", planSchema);
