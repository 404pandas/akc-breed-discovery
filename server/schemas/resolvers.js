const { AuthenticationError } = require("apollo-server-express");
const { User, Breed, Group, SavedBreed } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    // Get all Users
    users: async () => {
      return User.find().populate("breeds").select("-__v -password");
    },
    // Get one User
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId })
        .populate("breeds")
        .select("-__v -password");
    },
    // Get current User
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("breeds")
          .select("-__v -password");
      }
      throw new AuthenticationError("Please log in!");
    },

    // Get all saved breeds
    breeds: async (parent, { userId }) => {
      const params = userId ? { userId } : {};
      return Breed.find().sort({ breedName: 1 });
    },
    // Get one breed
    breed: async (parent, { breedId }) => {
      return Breed.findOne({ _id: breedId });
    },

    // Get all groups
    groups: async (parent, { groupId }) => {
      return Group.find().sort({ groupName: 1 });
    },
    // Get single group
    group: async (parent, { groupId }) => {
      return Group.findOne({ _id: groupId });
    },
  },

  Mutation: {
    // Login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("User not found!");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    // Add user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // Edit user
    editUser: async (parent, args, context) => {
      if (context.user) {
        if (args.password) {
          const saltRounds = 12;
          const newPassword = await bcrypt.hash(args.password, saltRounds);
          return User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $set: {
                username: args.username,
                password: newPassword,
                email: args.email,
              },
            },
            { new: true }
          );
        }
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              username: args.username,
              email: args.email,
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("Please login!");
    },
    // Delete user
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("Please login!");
    },
    // Add saved breed
    addSavedBreed: async (parent, args, context) => {
      if (context.user) {
        const savedBreed = await SavedBreed.create({
          ...args,
          userId: context.user._id,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedbreeds: savedBreed._id } }
        );
        return savedBreed;
      }
      throw new AuthenticationError("Please login!");
    },

    // Delete saved breed
    deleteSavedBreed: async (parent, args, context) => {
      if (context.user) {
        const savedBreed = await SavedBreed.findOneAndDelete({
          _id: args.savedBreedId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedbreeds: savedBreed._id } }
        );
        return savedBreed;
      }
      throw new AuthenticationError("Please login!");
    },
  },
};

module.exports = resolvers;
