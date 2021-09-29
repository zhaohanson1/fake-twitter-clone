let mongoose = require("mongoose");

let {
  User,
  createUser,
  findUser,
  deleteUser,
} = require("../server/dist/models/user");

let chai = require("chai");
let { ready } = require("../server/dist/server");
let should = chai.should();

describe("Auth", () => {
  beforeEach(async () => {
    await ready;
    User.deleteMany({}, (err) => {
      if (err) console.log(err);
    });
  });

  describe("Creating a user.", () => {
    function expectcreateUserToFail(args, done) {
      createUser(args)
        .then((res) => {
          done(new Error("Expected to fail: " + res));
        })
        .catch((err) => {
          done();
        });
    }

    function expectcreateUserToPass(args, done) {
      createUser(args)
        .then((result) => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    }

    describe("email requirements", () => {
      it("should require an email field", (done) => {
        var args = { username: "foo", password: "bar" };
        expectcreateUserToFail(args, done);
      });

      it("should not allow duplicate emails", (done) => {
        var args = { username: "foo", password: "bar", email: "foo@bar.com" };
        createUser(args)
          .then(async (res) => {
            return createUser({
              username: "boo",
              password: "bar",
              email: "foo@bar.com",
            });
          })
          .then((user) => {
            if (user) done(new Error("Duplicate should not be allowed."));
          })
          .catch((err) => {
            done();
          });
      });
      describe("email format", () => {
        describe("valid formats", () => {
          it("test@domain.com", (done) => {
            var args = {
              email: "test@domain.com",
              username: "foo",
              password: "bar",
            };
            expectcreateUserToPass(args, done);
          });
          it("lastname@domain.com", (done) => {
            var args = {
              email: "lastname@domain.com",
              username: "foo",
              password: "bar",
            };
            expectcreateUserToPass(args, done);
          });
          it("test.email.with+symbol@domain.com", (done) => {
            var args = {
              email: "test.email.with+symbol@domain.com",
              username: "foo",
              password: "bar",
            };
            expectcreateUserToPass(args, done);
          });
          it("id-with-dash@domain.com", (done) => {
            var args = {
              email: "id-with-dash@domain.com",
              username: "foo",
              password: "bar",
            };
            expectcreateUserToPass(args, done);
          });
          it("a@domain.com (one-letter local part)", (done) => {
            var args = {
              email: "a@domain.com",
              username: "foo",
              password: "bar",
            };
            expectcreateUserToPass(args, done);
          });

          it(`example-abc@abc-domain.com`, (done) => {
            var args = {
              email: `example-abc@abc-domain.com`,
              username: "foo",
              password: "bar",
            };
            expectcreateUserToPass(args, done);
          });

          it(`#!$%&'*+-/=?^_{}|~@domain.org`, (done) => {
            var args = {
              email: `#!$%&'*+-/=?^_{}|~@domain.org`,
              username: "foo",
              password: "bar",
            };
            expectcreateUserToPass(args, done);
          });
        });

        describe("invalid formats", () => {
          it("should have an @ character", (done) => {
            var args = {
              email: "example.com",
              username: "foo",
              password: "bar",
            };
            expectcreateUserToFail(args, done);
          });
          it("should have only one @ outside quotation marks", (done) => {
            var args = {
              email: "A@b@c@domain.com",
              username: "foo",
              password: "bar",
            };
            expectcreateUserToFail(args, done);
          });
          it("should have none of the special characters in this local part outside quotation marks", (done) => {
            var args = {
              email: 'a"b(c)d,e:f;gi[jk]l@domain.com',
              username: "foo",
              password: "bar",
            };
            expectcreateUserToFail(args, done);
          });
          it("quoted strings must be dot separated or the only element making up the local part", (done) => {
            var args = {
              email: 'abc"test"email@domain.com',
              username: "foo",
              password: "bar",
            };
            expectcreateUserToFail(args, done);
          });
          it("spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash", (done) => {
            var args = {
              email: 'abc is"not\valid@domain.com',
              username: "foo",
              password: "bar",
            };
            expectcreateUserToFail(args, done);
          });
          it("even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained in quotes", (done) => {
            var args = {
              email: 'abc is"not\valid@domain.com',
              username: "foo",
              password: "bar",
            };
            expectcreateUserToFail(args, done);
          });
          it("should have a single dot before @.", (done) => {
            var args = {
              email: ".test@domain.com",
              username: "foo",
              password: "bar",
            };
            expectcreateUserToFail(args, done);
          });
          it("should have a single dot after @.", (done) => {
            var args = {
              email: "foo@domain..com",
              username: "foo",
              password: "bar",
            };
            expectcreateUserToFail(args, done);
          });
          /*

          # Some kind of internal escaping deals with this.

          it("should not have a leading space.", (done) => {
            var args = {
              email: String.fromCharCode(32)+"foo@domain.com",
              username: "foo",
              password: "bar",
            };
            expectcreateUserToFail(args, done);
          });
          it("should not have a trailing space.", (done) => {
            var args = {
              email: "foo@domain.com ",
              username: "foo",
              password: "bar",
            };
            expectcreateUserToFail(args, done);
          });
          */
        });
      });
    });

    describe("username requirements", () => {
      it("should require a username field", (done) => {
        var args = { email: "foo@bar.com", password: "bar" };
        expectcreateUserToFail(args, done);
      });
      it("should not allow duplicate usernames", (done) => {
        var args = { username: "foo", password: "bar", email: "foo@bar.com" };
        createUser(args)
          .then(async (res) => {
            return createUser({
              username: "foo",
              password: "bar",
              email: "baz@bat.com",
            });
          })
          .then((user) => {
            if (user) done(new Error("Duplicate should not be allowed."));
          })
          .catch((err) => {
            done();
          });
      });
      describe("username format", () => {
        it("should be at least 1 character(s) long", (done) => {
          createUser({ username: "", password: "bar", email: "foo@bar.com" })
            .then((user) => {
              if (user) {
                done(new Error());
              }
            })
            .catch((err) => {
              done();
            });
        });

        it("should have a maxLength of 256 characters", (done) => {
          var name = "a".repeat(257);
          createUser({ username: name, password: "bar", email: "foo@bar.com" })
            .then((user) => {
              if (user) {
                done(new Error());
              }
            })
            .catch((err) => {
              done();
            });
        });
      });
    });

    it("should require a password", (done) => {
      var args = { email: "foo@bar.com", username: "foo" };
      expectcreateUserToFail(args, done);
    });
  });

  describe("Find a user.", () => {
    beforeEach((done) => {
      createUser({ username: "foo", password: "bar", email: "foo@bar.com" })
        .then((res) => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    describe("finding an existing user", () => {
      it("should be able to find with matching username", (done) => {
        findUser({ username: "foo" })
          .then((res) => {
            done();
          })
          .catch((err) => {
            done(err);
          });
      });

      it("should be able to find with matching email", (done) => {
        findUser({ email: "foo@bar.com" })
          .then((res) => {
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    it("should not find a username that doesn't exist", (done) => {
      findUser({ username: "baz" })
        .then((res) => {
          if (res == undefined) {
            done();
          } else {
            throw new Error("Username should not exist: " + res);
          }
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should not find an email that doesn't exist", (done) => {
      findUser({ username: "baz@bat.org" })
        .then((res) => {
          if (res == undefined) {
            done();
          } else {
            throw new Error("Email should not exist: " + res);
          }
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("Update a user.", () => {
    it("should update an existing user");
  });

  describe("Delete a user.", () => {
    beforeEach((done) => {
      createUser({ username: "foo", password: "bar", email: "foo@bar.com" })
        .then((res) => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should not delete a user that doesn't exist", (done) => {
      // Mongoose doesn't do anything special so it should be fine? Maybe warn if user doesn't exists?
      deleteUser({ username: "baz" })
        .then((res) => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    describe("delete an existing user", () => {
      it("should be able to delete by username", (done) => {
        deleteUser({ username: "foo" })
          .then((res) => {
            return findUser({ username: "foo" });
          })
          .then((user) => {
            if (!user) done();
            else done(new Error("User should have been deleted"));
          })
          .catch((err) => {
            done(err);
          });
      });

      it("should be able to delete by email", (done) => {
        deleteUser({ email: "foo@bar.com" })
          .then((res) => {
            return findUser({ email: "foo@bar.com" });
          })
          .then((user) => {
            if (!user) done();
            else done(new Error("User should have been deleted"));
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });

  afterEach(async () => {
    User.deleteMany({}, (err) => {
      if (err) console.log(err);
    });
  });
});
