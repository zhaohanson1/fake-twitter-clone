export {};
var ObjectId = require("mongoose").Types.ObjectId;
let chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

let { ready } = require("../../server/dist/server");

var { Status } = require("../../server/dist/models/status");
var { createUser, User } = require("../../server/dist/models/user");


let should = chai.should();
var userController = require("../controllers/userController");

describe("User controller", () => {
    beforeEach(async () => {
      if (process.env.NODE_ENV != "test") {
        console.error("WARNING: RUNNING TESTS ON NON-TEST ENVIRONMENT");
        process.exit(1);
      }
  
      await ready;
      Status.deleteMany({}, (err: any) => {
        if (err) console.log(err);
      });
      User.deleteMany({}, (err: any) => {
        if (err) console.log(err);
      });
    });
  
    afterEach(async () => {
      Status.deleteMany({}, (err: any) => {
        if (err) console.log(err);
      });
      User.deleteMany({}, (err: any) => {
        if (err) console.log(err);
      });
    });
});