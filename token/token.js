//Refresh Token Schema
const mongoose = require("mongoose");

const TokenSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 6,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Token", TokenSchema);
