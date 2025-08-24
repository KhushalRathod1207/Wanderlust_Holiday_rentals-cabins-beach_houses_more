const Listing = require("../model/listing");
const Review = require("../model/review");
const { cloudinary } = require("../cloudConfing.js");

// GET all listings
module.exports.index = async (req, res, next) => {
    try {
        const allListings = await Listing.find({});
        res.json({ success: true, listings: allListings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// CREATE new listing
module.exports.createListing = async (req, res, next) => {
    try {
        const { title, description, price, country, category, location } = req.body;

        if (!title || !description || !price || !country || !category || !location) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        const listing = new Listing({
            title,
            description,
            price,
            country,
            category,
            location,
            owner: req.user ? req.user._id : null
        });

        if (req.file) {
            listing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        await listing.save();
        res.status(201).json({ success: true, listing });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// GET particular listing
module.exports.showListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id)
            .populate({
                path: "reviews",
                populate: { path: "author", select: "username _id" }
            })
            .populate("owner");

        if (!listing) {
            return res.status(404).json({ success: false, message: "Listing not found" });
        }

        res.json({ success: true, listing });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports.updateListing = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

        const { title, description, price, country, category, location } = req.body;

        listing.title = title ?? listing.title;
        listing.description = description ?? listing.description;
        listing.price = price ?? listing.price;
        listing.country = country ?? listing.country;
        listing.category = category ?? listing.category;
        listing.location = location ?? listing.location;

        if (req.file) {
            // Delete old image from Cloudinary
            if (listing.image?.filename) {
                await cloudinary.uploader.destroy(listing.image.filename);
            }
            listing.image = {
                url: req.file.path,        // Cloudinary URL
                filename: req.file.filename || req.file.originalname // fallback
            };
        }

        await listing.save();
        return res.status(200).json({ success: true, message: "Listing updated successfully", listing });
    } catch (err) {
        console.error("Update Listing Error:", err);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};


// DELETE listing
module.exports.deleteListing = async (req, res, next) => {
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);

        if (!listing) {
            return res.status(404).json({ success: false, message: "Listing not found" });
        }

        if (listing.reviews && listing.reviews.length > 0) {
            await Review.deleteMany({ _id: { $in: listing.reviews } });
        }

        // Delete image from Cloudinary
        if (listing.image?.filename) {
            await cloudinary.uploader.destroy(listing.image.filename);
        }

        res.json({ success: true, message: "Listing deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
