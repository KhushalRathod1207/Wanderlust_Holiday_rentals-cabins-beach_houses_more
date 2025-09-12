if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


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
const port = process.env.PORT || 3008;

// Import routes
const listingsRoute = require("./routes/listings.js");
const reviewsRoute = require("./routes/reviews.js");
const profileRoute = require("./routes/Profile.js");
const userRoute = require("./routes/user.js");
const searchRoute = require("./routes/search.js");
const categoryRoutes = require("./routes/categories.js");
const chatbotRoutes = require("./routes/chatbot.js");

// Models
const User = require("./model/user.js");

// Utils
const ExpressError = require("./utils/expressError.js");
const WrapAsync = require("./utils/WrapAsync.js");

// DB connection
const dbUrl = process.env.ATLASDB_URL;
mongoose.connect(dbUrl)
    .then(() => console.log("Connected to Database"))
    .catch(err => console.log(err));

// EJS setup
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// CORS
app.use(cors({
    origin: "http://localhost:5173",  // React app origin
    credentials: true                 // allows sending cookies / credentials
}));

// Session store
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: { secret: process.env.SECRET },
    touchAfter: 24 * 3600
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
};

app.use(session(sessionOptions));
app.use(flash());



// Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passport_local_strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash & current user middleware
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/api", chatbotRoutes);
app.use("/listings", listingsRoute);
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/profile", profileRoute);
app.use("/users", userRoute);
app.use("/search", searchRoute);
app.use("/categories", categoryRoutes);


// // 404
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });

// Error handler
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    console.error(err);
    res.status(status).json({ success: false, status, message });
});

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
