const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const searchController = require("../controllers/search.js");

// GET /search?query=keyword
router.get("/", WrapAsync(searchController.searchListings));

module.exports = router;
