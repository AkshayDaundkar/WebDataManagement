const express = require("express");
const { getAllMessages, sendMessage } = require("../models/messageContoller");

const router = express.Router();

router.get("/messages", getAllMessages);
router.post("/messages", sendMessage);

module.exports = router;
