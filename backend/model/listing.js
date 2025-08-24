const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

// Listing Schema (*)
const listingSchema = new Schema({
    title: {
        type: String,
        required: [true, "Listing title is required"]
    },
    description: {
        type: String,
        required: [true, "Listing description is required"]
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    country: {
        type: String,
        required: [true, "Country is required"]
    },
    reviews: [
        { type: Schema.Types.ObjectId, ref: "Review" }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: String,
        enum: [
            "Trending", "Bed Breakfast", "Top Cities", "Farmes", "Boats", "Rooms", "Iconic Cities",
            "Mountain Sun", "Mountains", "Castles", "Earth Homes", "Amazing Pools",
            "Container", "Camping", "Farms", "Arctic", "Domes"
        ],
        default: "Trending"
    }
}, { timestamps: true });

// Delete associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async function (listing) {
    if (listing && listing.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

module.exports = mongoose.model("Listing", listingSchema);
