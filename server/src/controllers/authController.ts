import { createUser } from "../models/user";

var userController = require("../controllers/userController");

module.exports = {
  signup: async (args: {
    username: string;
    email: string;
    password: string;
  }) => {
    userController.createUser(args);
  },
};
