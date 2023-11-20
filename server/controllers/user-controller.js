const { User, SavedBreed } = require("../models");

const userController = {
  // Get all users
  async getUsers(req, res) {
    try {
      const dbUserData = await User.find().select("-__v");

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Get single user
  async getSingleUser(req, res) {
    try {
      const dbUserData = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");

      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this user id!" });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Create user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Update user
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this user id!" });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Delete user
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this user id!" });
      }

      await SavedBreed.deleteMany({ _id: { $in: dbUserData.savedBreeds } });
      res.json({ message: "User and saved breeds deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // add saved breed to saved breed list
  async addSavedBreed(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this user id!" });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // remove saved breed from saved breed list
  async removeSavedBreed(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { savedBreeds: req.params.savedBreedId } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this user id!" });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
