const bcrypt = require("bcrypt");
import {createUser, getUser} from "../controllers/userController";
var saltRounds = 10;


export const saltAndHash = async (password: string) => {
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

module.exports = {
  
  signup: async (args: {
    username: string;
    email: string;
    password: string;
  }) => {
    return createUser(args);
  },

  validateUser: async (args: any) => {
    var query = {};

    if (args["username"] !== undefined) {
      query = { username: args["username"] };
    } else if (args["email"] !== undefined) {
      query = { email: args["email"] };
    } else {
      throw new Error("Missing credentials");
    }

    const user = await getUser(query);
    if (!user) {
      throw new Error("User not found.");
    }

    const password = args["password"];
    const hash = user.get("passwordHash");

    return bcrypt.compare(password, hash);
  },

  saltAndHash: saltAndHash,
};
