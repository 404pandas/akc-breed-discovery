const { Schema, model } = require("mongoose");

const breedSchema = new Schema(
  {
    breedName: {
      type: String,
      required: true,
    },
    breedDescription: {
      type: String,
      required: true,
    },
    yearAdded: {
      type: String,
      required: true,
    },
    noteId: {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Breed = model("Breed", breedSchema);

module.exports = Breed;
