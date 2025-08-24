const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Review Schema (*)
const reviewSchema = new Schema({
    comment: {
        type: String,
        required: [true, "Comment is required"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
