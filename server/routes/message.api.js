const express = require("express");
const messageController = require("../controllers/message.controller");
const router = express.Router();

/**
 * @route POST api/messages/
 * @description User can send message
 * @access Public
 */
router.post("/", messageController.sendMessage);

/**
 * @route GET api/messages?page=1&limit=10
 * @description User can get a list of messages
 * @access Public
 */
router.get("/", messageController.getListOfMessage);

/**
 * @route GET api/messages/:id
 * @description User can send message
 * @access Public
 */
router.get("/:id", messageController.getSingleMessage);

module.exports = router;
