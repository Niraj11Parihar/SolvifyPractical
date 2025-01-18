const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const schoolModel = mongoose.model("schooltbl", schoolSchema);
module.exports = schoolModel;
