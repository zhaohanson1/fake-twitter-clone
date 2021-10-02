import { Query } from "mongoose";

//Require Mongoose
var mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

interface validationArgs {
  username?: string;
  email?: string;
  password: string;
}

const saltRounds = 10;

async function saltAndHash(password: string) {
  return bcrypt
    .genSalt(saltRounds)
    .then((salt: string) => {
      return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err: any, hash: string) => {
          if (err) {
            reject(err);
          } else {
            resolve({ salt: salt, hash: hash });
          }
        });
      });
    })
    .catch((err: any) => {
      throw err;
    });
}

async function signupValidation(args: validationArgs) {
  try {
    if (args["email"] == undefined || args["email"] == "") {
      throw new Error("Email is missing.");
    }

    if (args["username"] == undefined || args["username"] == "") {
      throw new Error("Username is missing.");
    }

    if (args["password"] == undefined || args["password"] == "") {
      throw new Error("Password is missing.");
    }

    var emailUser = await findUser({ email: args["email"] });

    if (emailUser !== null) {
      throw new Error("Email has already been used.");
    }

    var usernameUser = await findUser({ username: args["username"] });

    if (usernameUser !== null) {
      throw new Error("Username has already been used.");
    }

    if (args["username"].length < 1 || args["username"].length > 256) {
      throw new Error(
        "Username is invalid length. Username should be at least 1 character long and less than or equal to 256 characters"
      );
    }
  } catch (err: any) {
    throw err;
  }
}

export async function createUser(args: validationArgs) {
  try {
    await signupValidation(args);
    var user = new User();
    user.email = args["email"];
    user.username = args["username"];
    var bcryptObj = await saltAndHash(args["password"]);
    user.passwordSalt = bcryptObj.salt;
    user.passwordHash = bcryptObj.hash;
    user.creationDate = new Date();
    await user.save();
    return user;
  } catch (err: any) {
    throw err;
  }
}

export async function findUser(params: object) {
  return User.findOne(params).exec();
}

export async function validateUser(args: validationArgs): Promise<any> {
  var query = {};

  if (args["username"] !== undefined) {
    query = { username: args["username"] };
  } else if (args["email"] !== undefined) {
    query = { email: args["email"] };
  } else {
    throw new Error("Missing credentials");
  }

  const user = await findUser(query);
  if (!user) {
    throw new Error("User not found.");
  }

  const password = args["password"];
  const hash = user.get("passwordHash");

  return bcrypt.compare(password, hash);
}

/**
 *
 *
 * @export
 * @param {object} Filter: an object that contains attribute value pairs to find matching users
 * @param {object | Array} Update: replace all matching user's attributes with corresponding value
 * @returns {Query}
 */
export function updateUser(userArgs: object, attributes: object) {
  return User.updateOne(userArgs, attributes);
}

export async function deleteUser(args: object) {
  return User.deleteOne(args).catch((err: any) => {
    if (err) throw err;
  });
}

module.exports = {
  User,
  createUser,
  findUser,
  validateUser,
  updateUser,
  deleteUser,
};
