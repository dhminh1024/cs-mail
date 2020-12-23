const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authentication");
const router = express.Router();

/**
 * @route POST api/users/
 * @description User can register for a new account
 * @access Public
 */
router.post("/", userController.register);

/**
 * @route GET api/users/:id/messages
 * @description Return list of messages sent to current user
 * @access Public
 */
router.get(
  "/:id/messages",
  authMiddleware.loginRequired,
  userController.getMessagesOfUser
);

module.exports = router;
