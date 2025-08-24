const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const { categories_display } = require("../controllers/categories.js");

// GET listings by category
router.route("/category/:category")
    .get(WrapAsync(categories_display));

module.exports = router;
