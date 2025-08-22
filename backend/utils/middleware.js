const { Joi_listingSchema, Joi_reviewSchema } = require("../Schema.js");
const Listing = require("../model/listing.js");
const Review = require("../model/review.js");
const ExpressError = require("./expressError.js");

// Check if user is logged in
module.exports.isLoggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ success: false, message: "You must be logged in" });
    }
    next();
};

// Validate Listing
module.exports.validateListing = (req, res, next) => {
    const { error } = Joi_listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        return res.status(400).json({ success: false, message: errMsg });
    }
    next();
};

// Validate Review
module.exports.validateReview = (req, res, next) => {
    const { error } = Joi_reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        return res.status(400).json({ success: false, message: errMsg });
    }
    next();
};

// Check Listing Owner
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).json({ success: false, message: "Listing not found" });
    }
    if (!listing.owner.equals(req.user._id)) {
        return res.status(403).json({ success: false, message: "You are not the owner of this listing" });
    }
    next();
};

// Check Review Author
module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        return res.status(404).json({ success: false, message: "Review not found" });
    }
    if (!review.author.equals(req.user._id)) {
        return res.status(403).json({ success: false, message: "You are not the author of this review" });
    }
    next();
};

// Save Redirect URL (optional for React, mainly frontend handles)
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
