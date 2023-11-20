const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    noteContent: {
      type: String,
      required: true,
    },
  },
  // user
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Note = model("Note", noteSchema);

module.exports = Note;
