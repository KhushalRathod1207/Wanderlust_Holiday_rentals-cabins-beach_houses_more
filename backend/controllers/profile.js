const User = require('../model/user');
const Listing = require('../model/listing');
const Review = require('../model/review'); // Make sure to import Review model

// -------------------------
// Get Profile by User ID
// -------------------------
module.exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: "User ID is required" });

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        const listings = await Listing.find({ owner: id }).populate({
            path: "reviews",
            populate: { path: "author", select: "username" }
        });

        res.json({
            success: true,
            user,
            listings
        });
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ error: "Server error" });
    }
};

// -------------------------
// Update Profile
// -------------------------
module.exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: "User ID is required" });

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedUser) return res.status(404).json({ error: "User not found" });

        res.json({
            success: true,
            message: "Profile updated successfully!",
            user: updatedUser
        });
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ error: "Server error" });
    }
};

// -------------------------
// DELETE user profile, listings, and reviews
// -------------------------
module.exports.deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        // Delete listings and their reviews
        const listings = await Listing.find({ owner: id });
        for (let listing of listings) {
            if (listing.reviews && listing.reviews.length > 0) {
                await Review.deleteMany({ _id: { $in: listing.reviews } });
            }
            await listing.deleteOne();
        }

        await user.deleteOne();

        res.json({ success: true, message: "User, listings, and reviews deleted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
