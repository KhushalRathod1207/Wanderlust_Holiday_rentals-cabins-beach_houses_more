const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync");
const searchController = require("../controllers/search");

// GET /search?query=keyword
router.get("/", WrapAsync(searchController.searchListings));


module.exports = router;
