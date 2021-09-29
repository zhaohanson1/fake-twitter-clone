let mongoose = require("mongoose");

let { User } = require("../server/dist/models/user");

let chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

let chaiHttp = require("chai-http");
let { server, ready } = require("../server/dist/server");
let should = chai.should();

chai.use(chaiHttp);
describe("Auth", () => {
  beforeEach(async () => {
    await ready;
    User.deleteMany({}, (err) => {
      if (err) console.log(err);
    });
  });

  describe("Signup a user.", () => {
    it("should create a user in the database.", async () => {
      var user = await User.findOne({ username: "admin" }).exec();
      expect(user).to.be.null;
      return chai
        .request(server)
        .post("/api/auth/signup")
        .send({ username: "admin", password: "password", email: "foo@bar.com" })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body["success"]).to.be.true;
        })
        .then(async () => {
          var user = await User.findOne({ username: "admin" }).exec();
          expect(user).to.not.be.null;
        });
    });
  });
});
