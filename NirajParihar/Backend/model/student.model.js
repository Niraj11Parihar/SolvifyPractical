const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  grade: { type: String, required: true },
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  createdAt: { type: Date, default: Date.now }
});

const studentModel = mongoose.model("studenttbl", studentSchema)
module.exports = studentModel