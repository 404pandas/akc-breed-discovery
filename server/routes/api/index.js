const router = require("express").Router();
const userRoutes = require("./user-routes");
const noteRoutes = require("./note-routes");
const groupRoutes = require("./group-routes");
const breedRoutes = require("./breed-routes");

router.use("/users", userRoutes);
router.use("/notes", noteRoutes);
router.use("/groups", groupRoutes);
router.use("/breeds", breedRoutes);

module.exports = router;
