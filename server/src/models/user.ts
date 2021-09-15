//Require Mongoose
var mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Define a schema
var Schema = mongoose.Schema;
var regEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

var UserSchema = new Schema({
  _id: { type:  mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String },
  email: {
    type: String,
    unique: [true, "Email has already been used."],
    lowercase: true,
    trim: true,
    maxLength: 320,
    required: true,
    match: [regEmail, "Invalid email format"],
  },
  phone: { type: String },
  creationDate: { type: Date },
  lastLogin: { type: Date },
  username: { type: String, required: true, unique: true, maxLength: 256 },
  passwordSalt: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

// Compile model from schema
export var User = mongoose.model("AccountModel", UserSchema);
User.init();

export interface UserArgs {
  email: string;
  username: string;
  password: string;
  creationDate: Date | null;
  passwordSalt: string | null;
  passwordHash: string | null;
}

/* TODO: read how to write good to db */
export function createUser(args: UserArgs) {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (_err: Error, salt: string) {
    bcrypt.hash(args["password"], salt, function (_err: Error, hash: string) {
      args["passwordSalt"] = salt;
      args["passwordHash"] = hash;
      args['creationDate'] = new Date();
      let newUser = new User(args);
      //console.log(newUser);
      newUser.save();
    });
  });
}

export async function findUser(params: object) {
  var user = User.findOne(params);
  // if doesnt exists, throw not found, else return user
  return user;
}

export async function validateUser(args: UserArgs) {
 
  const query = {username: args['username']} || {email: args['email']};
  if (!query) {
    // idk something went wrong
    return false;
  }
  const user = await findUser(query);
  if (!user) {
    return false;
  }
  
  const password = args['password'];
  const hash = user.get('passwordHash');

  console.log(user);
  console.log("Pass:" + password);

  try {
    var result = await bcrypt.compare(password, hash);
  } catch (e) {
    console.log(e);
    return false;
  }
  return result;
}

export function deleteUser() {
  // TODO
  return false;
}

module.exports = { User, createUser, findUser, validateUser };
