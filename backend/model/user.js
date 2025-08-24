const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// User Schema (*)
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    username: { type: String, required: true },
    mobileNo: String,
    gender: String,
    address: String,
    country: String,
    city: String,
    location: String
}, { timestamps: true });

// Add username & password via passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
