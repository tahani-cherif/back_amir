const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../services/messageControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/:chatId").get( allMessages);
router.route("/:id").post( sendMessage);

module.exports = router;
