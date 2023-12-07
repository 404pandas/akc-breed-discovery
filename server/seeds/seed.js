const db = require("../config/connection");

// models
const { User, Breed, Group, Note } = require("../models");

// seeds
const breedSeeds = require("./breedSeeds.json");
const groupSeeds = require("./groupSeeds.json");
const noteSeeds = require("./noteSeeds.json");
const userSeeds = require("./userSeeds.json");

db.once("open", async () => {
  try {
    await Breed.deleteMany({});
    await Group.deleteMany({});
    await User.deleteMany({});
    await Note.deleteMany({});

    // Create Breeds
    await Breed.create(breedSeeds);

    // Create Groups
    await Group.create(groupSeeds);

    // Create Users
    await User.create(userSeeds);

    // Create notes and adds to users
    for (let i = 0; i < noteSeeds.length; i++) {
      const { _id, noteAuthor } = await Note.create(noteSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: noteAuthor },
        {
          $addToSet: {
            notes: _id,
          },
        }
      );
    }
  } catch (err) {
    console.log("An error occured:");
    console.error(err);
    process.exit(1);
  }

  console.log("Finished seeding");
  process.exit(0);
});
