// Load environment variables (only in development)
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// -------------------------
// Import dependencies
// -------------------------
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const passport_local_strategy = require("passport-local");
const methodOverride = require("method-override");
const cors = require("cors");
const ejsMate = require("ejs-mate");

const port = process.env.PORT || 3008;

// -------------------------
// Import routes
// -------------------------
const listingsRoute = require("./routes/listings.js");
const reviewsRoute = require("./routes/reviews.js");
const profileRoute = require("./routes/Profile.js");
const userRoute = require("./routes/user.js");
const searchRoute = require("./routes/search.js");
const categoryRoutes = require("./routes/categories.js");

// -------------------------
// Models & Utils
// -------------------------
const User = require("./model/user.js");
const ExpressError = require("./utils/expressError.js");
const WrapAsync = require("./utils/WrapAsync.js");

// -------------------------
// Database connection
// -------------------------
const dbUrl = process.env.ATLASDB_URL;

mongoose.connect(dbUrl)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ DB Connection Error:", err));

// -------------------------
// View engine setup
// -------------------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -------------------------
// Middleware
// -------------------------
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// -------------------------
// CORS setup
// -------------------------
const allowedOrigins = [
    "http://localhost:5173", // Local development
    process.env.CLIENT_ORIGIN, // Production frontend
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// -------------------------
// Session configuration
// -------------------------
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: { secret: process.env.SECRET },
    touchAfter: 24 * 3600, // 1 day
});

store.on("error", (e) => {
    console.log("❌ SESSION STORE ERROR", e);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
};

// 🔒 Required for production cookie security (trust proxy)
app.set("trust proxy", 1);
app.use(session(sessionOptions));
app.use(flash());

// -------------------------
// Passport configuration
// -------------------------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passport_local_strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// -------------------------
// Flash messages + current user
// -------------------------
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// -------------------------
// Routes
// -------------------------
app.get("/", (req, res) => {
    res.json({ success: true, message: "🌍 Wanderlust backend is running successfully!" });
});

app.use("/listings", listingsRoute);
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/profile", profileRoute);
app.use("/users", userRoute);
app.use("/search", searchRoute);
app.use("/categories", categoryRoutes);

// -------------------------
// Error handler
// -------------------------
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    console.error("❌ ERROR:", err);
    res.status(status).json({ success: false, status, message });
});

// -------------------------
// Start server
// -------------------------
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
