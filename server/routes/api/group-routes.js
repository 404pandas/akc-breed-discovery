const router = require("express").Router();
const {
  getGroups,
  getSingleGroup,
} = require("../../controllers/group-controller");

// /api/group
router.route("/").get(getGroups);

// /api/group/:groupId
router.route("/:groupId").get(getSingleGroup);

module.exports = router;
