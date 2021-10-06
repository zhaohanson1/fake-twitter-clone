import { User } from "../models/user";

import { saltAndHash } from "../controllers/authController";

interface userArgs {
  username?: string;
  email?: string;
  password: string;
}

async function createUserValidation(args: userArgs) {
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

    var emailUser = await User.findOne({ email: args["email"] });

    if (emailUser !== null) {
      throw new Error("Email has already been used." + JSON.stringify(args));
    }

    var usernameUser = await User.findOne({ username: args["username"] });

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

export const createUser = async (args: userArgs) => {
  try {
    await createUserValidation(args);
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
};

export const getUser = (params: object) => {
  return User.findOne(params).exec();
};

module.exports = {
  /* CREATE */
  createUser: createUser,

  /* READ */
  getUser: getUser,

  getUserById: (userId: string) => {
    return User.findOne({ _id: userId }).exec();
  },

  /* UPDATE */

  /**
   * Wrapper for updateOne
   * @export
   * @param {object} Filter: an object that contains attribute value pairs to find matching users
   * @param {object | Array} Update: replace all matching user's attributes with corresponding value
   * @returns {Query}
   */
  updateUser: (userArgs: object, attributes: object) => {
    return User.updateOne(userArgs, attributes);
  },

  addStatusToUser: (userId: string, postId: string, callback: any) => {
    User.findByIdAndUpdate(
      userId,
      { $addToSet: { posts: { _id: postId } } },
      callback
    );
  },

  removeStatusFromUser: (userId: string, postId: string, callback: any) => {
    User.findByIdAndUpdate(
      userId,
      { $pull: { posts: { _id: postId } } },
      callback
    );
  },

  updateLastLogin: (id: string) => {
    const date = new Date();
    return User.updateOne({ _id: id }, { lastLogin: date }).exec();
  },

  /* DELETE */

  deleteUser: (params: object) => {
    return User.deleteOne(params).catch((err: any) => {
      if (err) throw err;
    });
  },
  deleteUserById: (userId: string) => {
    return module.exports.deleteUser({ _id: userId });
  },
};
