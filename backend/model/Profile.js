const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Profile Schema
const profileSchema = new Schema({
    mobileNo: {
        type: Number,
        required: [true, "Mobile number is required"]
    },
    address: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
