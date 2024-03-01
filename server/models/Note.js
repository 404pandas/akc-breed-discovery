const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    noteContent: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Note = model("Note", noteSchema);

module.exports = Note;
