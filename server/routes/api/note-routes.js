const router = require("express").Router();
const {
  getNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../../controllers/note-controller");

// /api/note
router.route("/").get(getNotes).post(createNote);

// /api/note/:noteId
router.route("/:noteId").get(getSingleNote).put(updateNote).delete(deleteNote);

module.exports = router;
