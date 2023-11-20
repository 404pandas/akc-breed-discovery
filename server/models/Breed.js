const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

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
    userId: {
      type: Schema.Types.ObjectId,
      ref: "SavedBreed",
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
