const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfing.js");
const upload = multer({ storage });

const listingsController = require("../controllers/listings.js");
const { isLoggedin, isListingOwner, validateListing } = require("../utils/middleware.js");
const WrapAsync = require("../utils/WrapAsync.js");

// INDEX: Get all listings / Create new listing
router.route("/")
    .get(WrapAsync(listingsController.index))
    .post(
        isLoggedin,
        upload.single("image"),
        validateListing,
        WrapAsync(listingsController.createListing)
    );

// SHOW, UPDATE, DELETE a particular listing
router.route("/:id")
    .get(WrapAsync(listingsController.showListing))
    .put(
        isLoggedin,
        isListingOwner,
        upload.single("image"),
        validateListing,
        WrapAsync(listingsController.updateListing)
    )
    .delete(
        isLoggedin,
        isListingOwner,
        WrapAsync(listingsController.deleteListing)
    );

module.exports = router;
