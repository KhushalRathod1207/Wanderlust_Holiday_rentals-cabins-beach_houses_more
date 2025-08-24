const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync.js");
const profileController = require("../controllers/profile.js");
const { isLoggedin, isProfileOwner } = require("../utils/middleware.js");

// View profile
router.route("/:id")
    .get(isLoggedin, WrapAsync(profileController.getProfile))
    .delete(
        isLoggedin,
        isProfileOwner,
        WrapAsync(profileController.deleteProfile)
    );

// Update profile
router.route("/:id/update")
    .post(isLoggedin, isProfileOwner, WrapAsync(profileController.updateProfile));

module.exports = router;
