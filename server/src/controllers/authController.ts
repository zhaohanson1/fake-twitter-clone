import { createUser } from "../models/user";

module.exports = {
  signup: async (args: {
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
};
