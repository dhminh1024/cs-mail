var express = require("express");
var router = express.Router();

// authAPI
const authAPI = require("./auth.api");
router.use("/auth", authAPI);

// userAPI
const userAPI = require("./user.api");
router.use("/users", userAPI);

// messageAPI
const messageAPI = require("./message.api");
router.use("/messages", messageAPI);

module.exports = router;
