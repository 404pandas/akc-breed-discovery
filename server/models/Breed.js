// Here is an example Model using mongoose!

const { Schema, model } = require("mongoose");

const breedSchema = new Schema(
  {
    breedName: {
      // Schema types available in Mongoose: String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema, UUID, BigInt
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
