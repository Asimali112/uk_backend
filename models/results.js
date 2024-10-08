
const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  passport: String, 
  listening: Number,
  reading: Number,
  writing: Number,
  speaking: Number,
  overall: Number,
  dob: Date, 
  candidateName: String,
  candidateNum: String,
  centreNum: String,
  testDate: Date,
});

module.exports = mongoose.model("Result", resultSchema);
