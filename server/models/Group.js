const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    details: {
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

const Group = model("Group", groupSchema);

module.exports = Group;
