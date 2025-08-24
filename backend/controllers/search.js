const Listing = require("../model/listing");

// Search listings by title (*)
module.exports.searchListings = async (req, res, next) => {
    try {
        const query = req.query.query || "";
        if (!query.trim()) {
            return res.status(400).json({ success: false, message: "Search query is required" });
        }

        const results = await Listing.find({
            title: { $regex: query, $options: "i" } // case-insensitive title search
        });

        res.status(200).json({ success: true, listings: results });
    } catch (err) {
        next(err);
    }
};
