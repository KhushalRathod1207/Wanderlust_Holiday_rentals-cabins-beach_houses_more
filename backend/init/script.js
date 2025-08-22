const mongoose = require("mongoose");
const initData = require("./data.js"); // sample listings
const Listing = require("../model/listing.js"); // Mongoose Listing model

// MongoDB connection URL
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("✅ Connected to Database");
    } catch (err) {
        console.error("❌ DB Connection Failed:", err);
    }
}

// Initialize DB with sample data
const initDB = async () => {
    try {
        // Remove old listings
        await Listing.deleteMany({});

        // Add an owner ID (replace this with a real User ID from your DB)
        const dataWithOwner = initData.data.map((obj) => ({
            ...obj,
            owner: "67eb64d2f8e09283d073bd9c", // sample user id
        }));
        // Insert data
        await Listing.insertMany(dataWithOwner);

        console.log("🎉 Database seeded successfully!");
    } catch (err) {
        console.error("❌ Error initializing DB:", err);
    } finally {
        mongoose.connection.close(); // close connection when done
    }
};

// Run script
main().then(() => initDB());
