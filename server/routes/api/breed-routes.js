const router = require("express").Router();
const {
  getBreeds,
  getSingleBreed,
} = require("../../controllers/breed-controller");

// /api/breeds
router.route("/").get(getBreeds);

// /api/breeds/:breedId
router.route("/:breedId").get(getSingleBreed);

module.exports = router;
