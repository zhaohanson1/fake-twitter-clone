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

export var Status = mongoose.model("StatusModel", StatusSchema);
Status.init();
module.exports = { Status };
