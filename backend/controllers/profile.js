const User = require('../model/user');
const Listing = require('../model/listing');

// -------------------------
// Get Profile by User ID
// -------------------------
module.exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ error: "User ID is required" });

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        const listings = await Listing.find({ owner: id });

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

        // Use req.body for updated data
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
