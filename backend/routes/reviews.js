const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync.js");
const reviewsController = require("../controllers/reviews.js");
const { isLoggedin, validateReview, isReviewAuthor } = require("../utils/middleware.js");

// POST a new review
router.post("/", isLoggedin, validateReview, WrapAsync(reviewsController.create_review));

// DELETE a review
router.delete(
    "/:reviewId",
    isLoggedin,
    WrapAsync(isReviewAuthor), // wrap async middleware
    WrapAsync(reviewsController.delete_Review)
);

module.exports = router;
