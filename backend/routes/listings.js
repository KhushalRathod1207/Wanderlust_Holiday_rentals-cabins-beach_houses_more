const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfing.js"); // Cloudinary storage
const upload = multer({ storage });
const WrapAsync = require("../utils/WrapAsync.js");
const listingsController = require("../controllers/listings.js");
const { isLoggedin, isOwner, validateListing } = require("../utils/middleware.js");

// INDEX + CREATE
router.route("/")
    .get(WrapAsync(listingsController.index))
    .post(isLoggedin, upload.single("listing[image]"), validateListing, WrapAsync(listingsController.createListing));

// NEW Listing form (JSON response)
// router.get("/new", isLoggedin, listingsController.render_New_Listing_Form);

// SHOW, UPDATE, DELETE
router.route("/:id")
    .get(WrapAsync(listingsController.show_Perticular_Listing))
    .put(
        isLoggedin,
        isOwner,
        WrapAsync(listingsController.show_Update_Listing) // no validateListing
    )
    .delete(isLoggedin, isOwner, WrapAsync(listingsController.delete_listing));

module.exports = router;
