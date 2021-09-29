import { createUser } from "../models/user";

module.exports = {
  signup: async (args: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await createUser({
        username: args["username"],
        password: args["password"],
        email: args["email"],
      });
      return { success: true, alert: null };
    } catch (err: any) {
      console.log(err);
      return { success: false, alert: err.message };
    }
  },
};
