export {};
var ObjectId = require("mongoose").Types.ObjectId;
let chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

let { ready } = require("../../server/dist/server");

var { Status } = require("../../server/dist/models/status");
var { User } = require("../../server/dist/models/user");
var statusController = require("../../server/dist/controllers/statusController");
var userController = require("../../server/dist/controllers/userController");
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


describe("Status controller", () => {
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

  describe("Posts", () => {
    var user: typeof User;
    before(async () => {
      var args = { username: "pfoo", password: "bar", email: "pfoo@bar.com" };
      user = await userController.createUser(args);
    });

    describe("addStatus", () => {
      it("should add a post to the database", () => {
        var result = statusController.addStatus(user.id, "Testing add status");
        expect(result).to.not.be.null;
        expect(result).to.not.be.undefined;
      });
    });

    describe("Existing Post", () => {
      var status: typeof Status;
      beforeEach(async () => {
        status = await statusController.addStatus(user.id, "Hello World");
      });

      describe("getStatus", () => {
        it("should get an existing status", async () => {
          await statusController
            .getStatus(status.id)
            .then((resultStatus: typeof Status) => {
              expect(resultStatus.id).to.be.equal(status.id);
              expect(resultStatus.content).to.be.equal(status.content);
            });
        });
      });

      describe("editStatus", () => {
        it("should get edit an existing status", async () => {
          await statusController
            .editStatus(status.id, "Hello Family")
            .then((resultStatus: typeof Status) => {
              expect(resultStatus.id).to.be.equal(status.id);
              expect(resultStatus.content).to.be.equal("Hello Family");
            });
        });
      });

      describe("removeStatus", () => {
        it("should get remove an existing status", async () => {
          var statusId = status.id;
          await statusController.removeStatus(statusId).then(() => {
            statusController
              .getStatus(statusId)
              .then((attemptStatus: typeof Status) => {
                expect(attemptStatus.length, attemptStatus).to.be.equal(0);
              });
          });
        });
      });
    });
  });

  describe("Comments", () => {
    var user1: typeof User;
    var user2: typeof User;
    var status: typeof Status;
    beforeEach(async () => {
      user1 = await userController.createUser({
        username: "cfoo",
        password: "bar",
        email: "cfoo@bar.com",
      });
      user2 = await userController.createUser({
        username: "cfoo2",
        password: "bar",
        email: "cfoo2@bar.com",
      });
      status = await statusController.addStatus(user1.id, "Hello World");
    });

    describe("addComment", () => {
      it("adds a comment to an existing post", () => {
        statusController
          .addComment(user2.id, user1.id, "Hola mundo")
          .then((result: typeof Status) => {
            expect(result).to.not.be.null;
            console.log("pass");
          });
      });
    });

    describe("existing comments", () => {
      var comment1: typeof Status;
      beforeEach(async () => {
        comment1 = await statusController
          .addComment(user2.id, user1.id, "Hola mundo")
          .catch((err: any) => {
            throw err;
          });
      });

      describe("removeComment", () => {
        it("should remove a comment if it exists", async () => {
          var comment1Id = comment1.id;
          expect(comment1Id).to.not.be.undefined;
          await statusController.removeComment(comment1Id);
          statusController
            .getStatus(comment1Id)
            .then((attemptStatus: typeof Status) => {
              expect(attemptStatus.length).to.be.equal(0);
            });
        });
      });

      describe("getComments", () => {
        it("should get all comments of a post");
      });
    });
  });

  describe("Likes", () => {
    var user1: typeof User;
    var user2: typeof User;
    var status: typeof Status;

    beforeEach(async () => {
      user1 = await userController.createUser({
        username: "foo",
        password: "bar",
        email: "foo@bar.com",
      });
      user2 = await userController.createUser({
        username: "foo2",
        password: "bar",
        email: "foo2@bar.com",
      });
      status = await statusController.addStatus(user1.id, "Hello World");
    });

    afterEach(async () => {
      Status.deleteMany({}, (err: any) => {
        if (err) console.log(err);
      });
      User.deleteMany({}, (err: any) => {
        if (err) console.log(err);
      });
    });

    describe("addLike", () => {
      it("should add a like if posts exists", async () => {
        await statusController.addLike(status.id, user2.id);
        // check if like exists: check post for user2's id
        var like = await Status.find({
          id: status.id,
          likes: ObjectId(user2.id),
        }).exec();
        expect(like.length, like).to.be.equal(1);
      });

      it("should do nothing if a like already exists", async () => {
        await statusController.addLike(status.id, user2.id);
        await statusController.addLike(status.id, user2.id);
        // check that exactly 1 like
        var like = await Status.find({
          id: status.id,
          likes: ObjectId(user2.id),
        });
        expect(like.length).to.be.equal(1);
      });
    });

    describe("removeLike", () => {
      it("should remove a like if it exists", async () => {
        await statusController.addLike(status.id, user2.id);
        // check that like exists
        var like = await Status.find({
          id: status.id,
          likes: ObjectId(user2.id),
        });
        expect(like.length).to.be.equal(1);
        await statusController.removeLike(status.id, user2.id);
        // check that like doesnt exists
        var like = await Status.find({
          id: status.id,
          likes: ObjectId(user2.id),
        });
        expect(like.length).to.be.equal(0);
      });

      it("should do nothing if like doesn't exists", async () => {
        // check that like doesnt exists
        var like = await Status.find({
          id: status.id,
          likes: ObjectId(user2.id),
        });
        expect(like.length).to.be.equal(0);
        await statusController.removeLike(status.id, user2.id);
        var like = await Status.find({
          id: status.id,
          likes: ObjectId(user2.id),
        });
        expect(like.length).to.be.equal(0);
      });
    });
  });
});
