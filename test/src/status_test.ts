export {};

let chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var ObjectId = require("mongoose").Types.ObjectId;

let { ready } = require("../../server/dist/server");

let { Status } = require("../../server/dist/models/status");
const { User } = require("../../server/dist/models/user");
var userController = require("../../server/dist/controllers/userController");
var statusController = require("../../server/dist/controllers/statusController");

let should = chai.should();

describe("Status", () => {
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

  describe("CRUD", () => {
    var user: typeof User;
    beforeEach(() => {
      var args = { username: "foo", password: "bar", email: "foo@bar.com" };
      user = userController.createUser(args);
    });

    describe("Create", () => {
      describe("requirements", () => {
        describe("post", () => {
          it("should require a user.", (done) => {
            var content = "Hello World";
            statusController
              .createStatus({ content: content })
              .then((status: typeof Status) => {
                if (status) {
                  throw new Error("No status should be found" + status);
                } else {
                  done();
                }
              })
              .catch((err: any) => {
                if (err.name == "ValidationError") done();
                else {
                  done(err);
                }
              });
          });

          it("should require content.", (done) => {
            var userId = ObjectId(user.id);
            statusController
              .createStatus({ user: userId })
              .then((status: typeof Status) => {
                if (status) {
                  throw new Error("No status should be found" + status);
                } else {
                  done();
                }
              })
              .catch((err: any) => {
                if (err.name == "ValidationError") done();
                else {
                  done(err);
                }
              });
          });

          it("should have a user and content", (done) => {
            var userId = ObjectId(user.id);
            var content = "Hello World";
            statusController
              .createStatus({ user: userId, content: content })
              .then((status: typeof Status) => {
                expect(status.user).to.be.equal(userId);
                expect(status.content).to.be.equal(content);
                expect(status).to.have.property("creationDate");
                expect(status.parent).to.be.null;
                done();
              })
              .catch((err: any) => {
                done(err);
              });
          });

          it("can have a itself as a parent", (done) => {
            var userId = ObjectId(user.id);
            var content = "Hello World";
            var parent = userId;
            statusController
              .createStatus({ user: userId, content: content, parent: parent })
              .then((status: typeof Status) => {
                expect(status.user).to.be.equal(userId);
                expect(status.content).to.be.equal(content);
                expect(status).to.have.property("creationDate");
                expect(status.parent).to.be.equal(userId);
                done();
              })
              .catch((err: any) => {
                done(err);
              });
          });
        });
      });
    });

    describe("Read", () => {
      var userId: String;
      var content: String;
      beforeEach(() => {
        userId = ObjectId(user.id);
        content = "Hello World";
        statusController.createStatus({ user: userId, content: content });
      });

      it("should find any post by user", (done) => {
        statusController
          .readStatus({ user: userId })
          .then((status: typeof Status) => {
            if (status) {
              done();
            } else {
              done(null);
            }
          })
          .catch((err: any) => {
            done(err);
          });
      });

      it("should find any post by content", (done) => {
        statusController
          .readStatus({ content: content })
          .then((status: typeof Status) => {
            if (status) {
              done();
            } else {
              done(null);
            }
          })
          .catch((err: any) => {
            done(err);
          });
      });
    });

    describe("Update", () => {
      var post: typeof Status;
      var content: string;
      var userId: string;
      beforeEach(async () => {
        userId = ObjectId(user.id);
        content = "Hello World";
        post = await statusController.createStatus({
          user: userId,
          content: content,
        });
      });

      it("should change the content", (done) => {
        statusController
          .updateStatus({ id: post.id }, { content: "Hello Planet" }, true)
          .then((status: typeof Status) => {
            if (status) {
              expect(status.content).to.not.be.equal(content);
              expect(status.content).to.be.equal("Hello Planet");
              done();
            } else {
              throw new Error("Missing status" + status);
            }
          })
          .catch((err: any) => {
            done(err);
          });
      });
    });

    describe("Delete", () => {
      var post: typeof Status;
      beforeEach(async () => {
        var userId = ObjectId(user.id);
        var content = "Hello World";
        post = await statusController.createStatus({
          user: userId,
          content: content,
        });
      });

      it("should not find a deleted status", (done) => {
        var postId = ObjectId(post.id);
        statusController
          .deleteStatus({ id: postId })
          .then((_status: typeof Status) => {})
          .then(statusController.readStatus({ id: postId }))
          .then((status: typeof Status) => {
            if (status) {
              throw new Error("Status has been found");
            }
            done();
          })
          .catch((err: any) => {
            done(err);
          });
      });
    });
  });
});
