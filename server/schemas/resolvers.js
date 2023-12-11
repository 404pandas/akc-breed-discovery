// Built in Auth error from apollo server express! No need to build out AuthenticationError in server/utils/auth.js
const { AuthenticationError } = require("apollo-server-express");
const { User, Breed, Group, Note } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    // Get all Users
    users: async () => {
      // Populates breed subdocument on every User
      return User.find().populate("savedBreeds").select("-__v -password");
    },
    // Get current User
    me: async (parent, args, context) => {
      // Populates breed subdocument on User dashboard
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select("-__v -password");
      }
      throw new AuthenticationError("Error! Please log in!");
    },
    // Get single group
    group: async (parent, { id }) => {
      if (id) {
        const groupData = await Group.findOne({ _id: id });
        return groupData;
      }
      throw Error;
    },
    // Get all groups
    groups: async (parent, { groupName }) => {
      return Group.find().sort({ groupName: 1 });
    },
    // Get all breeds
    allBreeds: async (parent, { breedName }) => {
      return Breed.find().sort({ breedName: 1 });
    },
    // Get one breed
    breed: async (parent, { id }) => {
      if (id) {
        const breedData = await Breed.findOne({ _id: id });
        return breedData;
      }
      throw Error;
    },
    // Get breeds by group number
    breeds: async (parent, { groupId }) => {
      const params = {};

      if (groupId) {
        params.groupId = groupId;
      }

      return Breed.find().sort({ breedName: 1 });
    },
    // Get all notes
    notes: async (parent, { noteId }) => {
      return Note.find().sort({ noteName: 1 });
    },
    // Get single note
    note: async (parent, { id }) => {
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
      if (context.breed) {
        const note = new Note({ notes });

        await User.findByIdAndUpdate(context.breed._id, {
          $push: { notes: note },
        });

        return note;
      }
      throw new AuthenticationError("Error! Please login!");
    },
    // Update note
    updateNote: async (parent, { _id, quantity }) => {
      if (context.breed) {
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
      if (context.breed) {
        return User.findOneAndDelete({ _id: context.breed._id });
      }
      throw new AuthenticationError("Error! Please login!");
    },
    // Save breed
    saveBreed: async (parent, { breedData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBreeds: breedData } },
          { new: true }
        );

        return updatedUser;
      }

      throw AuthenticationError;
    },
    // Remove saved breed
    removeBreed: async (parent, { breedData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBreeds: { breedData } } },
          { new: true }
        );

        return updatedUser;
      }

      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
