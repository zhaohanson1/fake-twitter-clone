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

export function createStatus(args: object) {
  var status = new Status(args);
  status.creationDate = new Date();
  return status
    .save()
    .then((status: typeof Status) => status)
    .catch((err: any) => {
      if (err) throw err;
    });
}

export function readStatus(args: object) {
  return Status.find(args).exec();
}

export async function updateStatus(
  filter: object,
  doc: object,
  new_doc?: boolean
) {
  return await Status.findOneAndUpdate(filter, doc, { new: new_doc }).exec();
}

export function deleteStatus(args: object) {
  return Status.deleteOne(args).catch((err: any) => {
    if (err) throw err;
  });
}

module.exports = {
  Status,
  createStatus,
  readStatus,
  updateStatus,
  deleteStatus,
};
