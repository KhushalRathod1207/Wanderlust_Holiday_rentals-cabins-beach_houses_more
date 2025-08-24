const User = require("../model/user");
const passport = require("passport");

// Signup Page - JSON placeholder (React frontend handles form)
module.exports.signup_Page_Render = (req, res) => {
    res.status(200).json({ message: "Send POST request with username, email, password to signup" });
};

// Signup user (*)
module.exports.user_Signup_On_Website = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        console.log(newUser);
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);

        // Auto-login after signup
        req.login(registerUser, (err) => {
            if (err) return next(err);
            res.status(201).json({
                success: true,
                user: registerUser,
                message: "Welcome to Wanderlust!"
            });
        });
    } catch (e) {
        res.status(400).json({ success: false, message: e.message });
    }
};

// Login Page - JSON placeholder (*)
module.exports.login_Page_Render = (req, res) => {
    res.status(200).json({ message: "Send POST request with username & password to login" });
};

// Login user(*)
module.exports.login_User = (req, res) => {
    const redirectUrl = res.locals.redirectUrl || '/listings';
    res.status(200).json({
        success: true,
        user: req.user,
        message: "Welcome back to Wanderlust!",
        redirectUrl
    });
};

// Logout user (*)
module.exports.logout_User = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.status(200).json({
            success: true,
            message: "Logged out successfully!"
        });
    });
};

// Current logged-in user (*)
module.exports.current_User = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ success: true, user: req.user });
    } else {
        res.json({ success: true, user: null });
    }
};
