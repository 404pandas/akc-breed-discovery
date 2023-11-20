const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    noteContent: {
      type: String,
      required: true,
    },
    breedId: {
      type: Schema.Types.ObjectId,
      ref: "Breed",
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
