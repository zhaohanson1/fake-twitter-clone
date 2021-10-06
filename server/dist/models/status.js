"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
//Require Mongoose
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var StatusSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    user: { type: Schema.Types.ObjectId, required: true },
    comments: [Schema.Types.ObjectId],
    likes: [Schema.Types.ObjectId],
    creationDate: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    parent: {
        type: Schema.Types.ObjectId,
        default: null,
    },
});
exports.Status = mongoose.model("StatusModel", StatusSchema);
exports.Status.init();
module.exports = { Status: exports.Status };
