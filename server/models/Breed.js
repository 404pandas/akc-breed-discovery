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
    },
    yearAdded: {
      type: Number,
    },
    keywords: {
      type: Array,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    lifeExpectancy: {
      type: Number,
    },
    coatType: {
      type: Array,
    },
    coatLength: {
      type: String,
    },
    colors: {
      type: Array,
    },
    markings: {
      type: Array,
    },
    breedImg: {
      type: String,
    },
    noteId: {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
    groupNumber: {
      type: Number,
      ref: "Group",
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
