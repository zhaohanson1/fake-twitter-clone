"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
module.exports = {
    updateLastLogin: function (id) {
        var date = new Date();
        user_1.updateUser({ _id: id }, { lastLogin: date });
    }
};
