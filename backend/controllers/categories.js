const Listing = require("../model/listing.js");

// Display Category wise listings (*)
module.exports.categories_display = async (req, res, next) => {
    try {
        const { category } = req.params;
        const listings = await Listing.find({ category });
        res.status(200).json({ category, listings }); // send JSON
    } catch (err) {
        next(err);
    }
};
