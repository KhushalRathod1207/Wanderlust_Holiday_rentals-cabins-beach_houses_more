const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync.js");
const profileController = require("../controllers/profile.js");
const { isLoggedin } = require("../utils/middleware.js");

// View profile (GET)
router.route("/:id")
    .get(isLoggedin, WrapAsync(profileController.getProfile));

// Update profile (POST)
router.route("/:id/update")
    .post(isLoggedin, WrapAsync(profileController.updateProfile));

module.exports = router;
