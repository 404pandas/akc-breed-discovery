const db = require("../config/connection");
const { User, Breed, Group, SavedBreed } = require("../models");
// TODO build and import seeds
// Breed seed
// Group seed
// Saved Breed seed
// Note seed

db.once("open", async () => {
  try {
    await Breed.deleteMany({});
    await Group.deleteMany({});
    await SavedBreed.deleteMany({});
    await User.deleteMany({});
    // await note

    // Create Users
    await User.create(userSeeds);
    const userData = await User.find();

    // Create saved breed and adds to users
    for (let i = 0; i < savedBreedSeeds.length; i++) {
      let br = i;
      if (i > 5) {
        br = 2;
      } else if (i > 2) {
        br = 1;
      } else {
        br = 0;
      }

      const { _id, userId } = await SavedBreed.create({
        ...savedBreedSeeds[i],
        userId: userData[j]._id,
      });
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            savedBreeds: _id,
          },
        }
      );
    }

    // Create saved notes and adds to breeds
  } catch (err) {
    console.log("An error occured:");
    console.error(err);
    process.exit(1);
  }

  console.log("Finished seeding");
  process.exit(0);
});
