const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  certificationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pdf", pdfSchema);
