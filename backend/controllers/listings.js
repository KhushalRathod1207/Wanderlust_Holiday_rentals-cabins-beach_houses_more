const Listing = require("../model/listing");

// GET all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.json({ success: true, listings: allListings });
};

// CREATE new listing
module.exports.createListing = async (req, res) => {
    const listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    if (req.file) listing.image = { url: req.file.path, filename: req.file.filename };
    await listing.save();
    res.status(201).json({ success: true, listing });
};

// GET particular listing
module.exports.show_Perticular_Listing = async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate("reviews").populate("owner");
    if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });
    res.json({ success: true, listing });
};

// UPDATE listing (without image)
// controllers/listings.js
module.exports.show_Update_Listing = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

        // Update fields from req.body.listing
        const { title, description, price, country, category, location } = req.body.listing;

        listing.title = title ?? listing.title;
        listing.description = description ?? listing.description;
        listing.price = price ?? listing.price;
        listing.country = country ?? listing.country;
        listing.category = category ?? listing.category;
        listing.location = location ?? listing.location;

        await listing.save(); // 🔑 Save to DB
        res.status(200).json({ success: true, message: "Listing updated successfully", listing });
    } catch (err) {
        next(err);
    }
};


// DELETE listing
module.exports.delete_listing = async (req, res) => {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });
    res.json({ success: true, message: "Listing deleted" });
};
