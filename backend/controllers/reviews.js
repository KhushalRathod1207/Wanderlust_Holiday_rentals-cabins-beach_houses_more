// controllers/reviews.js
const Listing = require("../model/listing.js");
const Review = require("../model/review.js");

// POST /listings/:id/reviews
module.exports.create_review = async (req, res) => {
    try {
        const { id } = req.params; // Listing ID
        const listing = await Listing.findById(id);
        if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

        const newReview = new Review(req.body.review); // { comment, rating }
        newReview.author = req.user._id;
        newReview.listing = listing._id; // <-- add this line
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        res.status(201).json({ success: true, message: "New review created", review: newReview });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE /listings/:id/reviews/:reviewId
module.exports.delete_Review = async (req, res) => {
    try {
        const { id, reviewId } = req.params; // Listing ID & Review ID

        const listing = await Listing.findById(id);
        if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

        // Pull review from listing
        listing.reviews.pull(reviewId);
        await listing.save();

        // Delete review document
        await Review.findByIdAndDelete(reviewId);

        res.status(200).json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
