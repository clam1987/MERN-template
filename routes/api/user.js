const router = require("express").Router();
const userController = require("../../controllers/UserController");
const passport = require("../../configs/passport");

router.route("/:id").get(userController.getUser);

router.route("/signup").post(userController.signup);

router
  .route("/login")
  .post(passport.authenticate("local"), userController.login);

router.route("/logout").get(userController.logout);

module.exports = router;
