export {};
var mongoose = require("mongoose");

var { User } = require("../../server/dist/models/user");

var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

let chaiHttp = require("chai-http");
let { server, ready } = require("../../server/dist/server");
let should = chai.should();

chai.use(chaiHttp);
describe("Auth", () => {
  beforeEach(async () => {
    if (process.env.NODE_ENV != "test") {
      console.error("WARNING: RUNNING TESTS ON NON-TEST ENVIRONMENT");
      process.exit(1);
    }
    await ready;
    User.deleteMany({}, (err: any) => {
      if (err) console.log(err);
    });
  });

  afterEach(async () => {
    User.deleteMany({}, (err: any) => {
      if (err) console.log(err);
    });
  });

  describe("Signup a user.", () => {
    it("should create a user in the database.", async () => {
      var user = await User.findOne({ username: "admin" }).exec();
      expect(user, "beginning").to.be.null;
      return chai
        .request(server)
        .post("/api/auth/signup")
        .send({ username: "admin", password: "password", email: "foo@bar.com" })
        .then((res: any) => {
          expect(res, res.status).to.have.status(200);
          expect(res.body["success"], res.body['alert']).to.be.true;
        })
        .then(async () => {
          var user = await User.findOne({ username: "admin" }).exec();
          expect(user, user).to.not.be.null;
        });
    });
  });
});
