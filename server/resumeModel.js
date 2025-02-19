const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  skills: String,
  experience: String,
  education: String,
  institute: String,
  marks: String,
  passingYear: String,
  selectedOption: String,
  checked: Boolean
});

module.exports = mongoose.model('Resume', resumeSchema);
