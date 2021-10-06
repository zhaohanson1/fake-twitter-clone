import {
  updateUser,
  User,
  createUser,
  findUser,
  deleteUser,
} from "../models/user";

module.exports = {
  
  createUser: async (args: {
    username: string;
    email: string;
    password: string;
  }) => {
    return createUser({
      username: args["username"],
      password: args["password"],
      email: args["email"],
    })
      .then((result: any) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  },

  updateLastLogin: (id: string) => {
    const date = new Date();
    updateUser({ _id: id }, { lastLogin: date });
  },

  getUser: (userId: string) => {
    return findUser({ _id: userId });
  },

  deleteUser: (userId: string) => {
    deleteUser({ _id: userId });
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
};
