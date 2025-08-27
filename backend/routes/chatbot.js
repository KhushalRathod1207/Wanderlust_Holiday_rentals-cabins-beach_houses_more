const express = require("express");
const { get_API_data } = require("../controllers/chatbot");
const router = express.Router();
const { isLoggedin } = require("../utils/middleware.js");


router.post("/chat", get_API_data);

module.exports = router;
