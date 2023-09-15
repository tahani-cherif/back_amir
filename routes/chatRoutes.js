const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../services/chatControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/:id").post( accessChat);
router.route("/:id").get( fetchChats);
router.route("/group/:id").post( createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
