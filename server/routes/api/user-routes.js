const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addSavedBreed,
  removeSavedBreed,
} = require("../../controllers/user-controller");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/savedBreeds/:savedBreedId
router
  .route("/:userId/savedBreeds/:savedBreedId")
  .post(addSavedBreed)
  .delete(removeSavedBreed);

module.exports = router;
