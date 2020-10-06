const router = require("express").Router();
const userRoutes = require("../api/user");

router.use("/users", userRoutes);

module.exports = router;