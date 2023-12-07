// Built in Auth error from apollo server express! No need to build out AuthenticationError in server/utils/auth.js
const { AuthenticationError } = require("apollo-server-express");
const { User, Breed, Group, SavedBreed } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    // Get all Users
    users: async () => {
      // Populates breed subdocument on every User
      return User.find().populate("breeds").select("-__v -password");
    },
    // Get one User
    user: async (parent, { userId }) => {
      // Populates breed subdocument on every User
      return User.findOne({ _id: userId })
        .populate("breeds")
        .select("-__v -password");
    },
    // Get current User
    me: async (parent, args, context) => {
      // Populates breed subdocument on User dashboard
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("breeds")
          .select("-__v -password");
      }
      throw new AuthenticationError("Error! Please log in!");
    },
    // Get single group
    group: async (parent, { groupId }) => {
      return Group.findOne({ _id: groupId });
    },
    // Get all groups
    groups: async (parent, { groupId }) => {
      return Group.find().sort({ groupName: 1 });
    },
    // Get all saved breeds
    savedBreeds: async (parent, { userId }) => {
      const params = userId ? { userId } : {};
      return Breed.find().sort({ breedName: 1 });
    },
    // Get all breeds
    breeds: async (parent, { breedId }) => {
      return Breed.find().sort({ breedName: 1 });
    },
    // Get one breed
    breed: async (parent, { breedId }) => {
      return Breed.findOne({ _id: breedId });
    },
    // Get all notes
    notes: async (parent, { noteId }) => {
      return Note.find().sort({ noteName: 1 });
    },
    // Get single note
    note: async (parent, { noteId }) => {
      return Note.findOne({ _id: noteId });
    },
  },

  Mutation: {
    // Login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Error! User not found!");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Error! Incorrect password!");
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
      throw new AuthenticationError("Error! Please login!");
    },
    // Delete user
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("Error! Please login!");
    },
    // Create note
    addNote: async (parent, { notes }) => {
      if (context.user) {
        const note = new Note({ notes });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { notes: note },
        });

        return note;
      }
      throw new AuthenticationError("Error! Please login!");
    },
    // Update note
    updateNote: async (parent, { _id, quantity }) => {
      if (context.user) {
        const decrement = Math.abs(quantity) * -1;

        return await Note.findByIdAndUpdate(
          _id,
          { $inc: { quantity: decrement } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    // Delete note
    deleteNote: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("Error! Please login!");
    },
    // Save breed
    saveBreed: async (parent, { breed }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBreeds: breed } },
          { new: true }
        );

        return updatedUser;
      }

      throw AuthenticationError;
    },
    // Remove saved breed
    removeBreed: async (parent, { breedId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { removedBreeds: { breedId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
