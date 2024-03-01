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
        return User.findOne({ _id: context.user._id })
          .populate("savedBreeds")
          .populate("notes")
          .select("-__v -password");
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
    // notesbyBreedandUser: async (parent, { userId, breedId }, context) => {
    //   try {
    //     if (!context.user) {
    //       throw new Error("Error! You need to be logged in to view notes!");
    //     }

    //     const breed = await Breed.findById(breedId);

    //     if (!breed) {
    //       throw new Error("Error! Breed not found!");
    //     }
    //     if (!breed.notes || breed.notes.length === 0) {
    //       return [];
    //     }

    //     const notes = await Note.find({
    //       _id: { $in: breed.notes },
    //       noteAuthor: userId,
    //     });
    //     return notes;
    //   } catch (error) {
    //     throw new Error(error.message);
    //   }
    // },
    // Get all notes
    notes: async (parent) => {
      try {
        const noteData = await Note.find();
        if (!noteData) {
          throw new Error("Error! Note not found!");
        }
        return noteData;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Get single note
    note: async (parent, { id }) => {
      try {
        const noteData = await Note.findById(id);
        if (!noteData) {
          throw new Error("Error! Note not found!");
        }

        return noteData;
      } catch (error) {
        throw new Error(error.messsage);
      }
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
    // Create note
    addNote: async (parent, { noteData }, context) => {
      try {
        if (!context.user) {
          throw new Error("Error! You need to be logged in to create a note!");
        }

        const breed = await Breed.findById(noteData.breedId);

        if (!breed) {
          throw new Error("Error! Breed not found!");
        }
        const noteAuthor = context.user._id;

        const newNote = new Note({
          noteContent: noteData.noteContent,
          noteAuthor: noteAuthor,
        });

        await newNote.save();

        breed.notes.push(newNote._id);
        await breed.save();

        return newNote;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    // Update note
    updateNote: async (parent, { _id, breedId }) => {
      const existingNote = await Note.findOne({ _id, breedId });

      if (!existingNote) {
        throw new Error("Error! Note not found!");
      } else {
        await existingNote.save();
        return existingNote;
      }
    },
    // Delete note
    deleteNote: async (parent, { _id, breedId }) => {
      try {
        // Find and delete the note based on noteId and breedId
        const deleteResult = await Note.deleteOne({ _id, breedId });

        if (deleteResult.deletedCount === 0) {
          return {
            success: false,
            message: "Note not found! You sure this exists?",
          };
        }

        return {
          success: true,
          message: "Your note has been successfully delete!",
        };
      } catch (error) {
        // Handle any errors that occur during the deletion process
        return { success: false, message: error.message };
      }
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
    removeBreed: async (parent, { breedId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBreeds: { breedId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
