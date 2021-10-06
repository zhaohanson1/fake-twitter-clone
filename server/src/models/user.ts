//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;
var regEmail =
  /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/;

var UserSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String },
  email: {
    type: String,
    unique: [true, "Email has already been used."],
    lowercase: true,
    trim: true,
    maxLength: 320,
    required: [true, "Email is required."],
    match: [regEmail, "Invalid email format."],
  },
  statuses: [Schema.Types.ObjectId],
  phone: { type: String },
  creationDate: { type: Date },
  lastLogin: { type: Date },
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: [true, "Username has already been used."],
    maxLength: 256,
  },
  passwordSalt: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

// Compile model from schema
export var User = mongoose.model("AccountModel", UserSchema);
User.init();

module.exports = { User };
