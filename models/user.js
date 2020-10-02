const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    maxlength: 555,
    minlength: 6,
  },
  password: {
    type: String,
    required: true,
    maxlength: 555,
    minlength: 6,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 1,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 1,
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
