const { Note, User } = require("../models");

const noteController = {
  // get all notes
  async getNotes(req, res) {
    try {
      const dbNoteData = await Note.find().sort({ createdAt: -1 });

      res.json(dbNoteData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // get single note by id
  async getSingleNote(req, res) {
    try {
      const dbNoteData = await Note.findOne({ _id: req.params.noteId });

      if (!dbNoteData) {
        return res.status(404).json({ message: "No note with this note id!" });
      }

      res.json(dbNoteData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // create a note
  async createNote(req, res) {
    try {
      const dbNoteData = await Note.create(req.body);

      const dbUserData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { notes: dbNoteData._id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({
          message: "Note created but no user associated with this note id!",
        });
      }

      res.json({ message: "Note created successfully!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // update note
  async updateNote(req, res) {
    const dbNoteData = await Note.findOneAndUpdate(
      { _id: req.params.noteId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!dbNoteData) {
      return res.status(404).json({ message: "No note with this note id!" });
    }

    res.json(dbNoteData);

    console.log(err);
    res.status(500).json(err);
  },
  // delete note
  async deleteNote(req, res) {
    try {
      const dbNoteData = await Note.findOneAndRemove({
        _id: req.params.noteId,
      });

      if (!dbNoteData) {
        return res.status(404).json({ message: "No note with this note id!" });
      }

      // remove note id from user's `notes` field
      const dbUserData = User.findOneAndUpdate(
        { notes: req.params.noteId },
        { $pull: { notes: req.params.noteId } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({
          message: "Note created but no user associated with this note id!",
        });
      }

      res.json({ message: "Note deleted successfully!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // add a reaction to a note
  async addReaction(req, res) {
    try {
      const dbNoteData = await Note.findOneAndUpdate(
        { _id: req.params.noteId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!dbNoteData) {
        return res.status(404).json({ message: "No note with this note id!" });
      }

      res.json(dbNoteData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = noteController;
