const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../utils/middleware.js");
const usersControllers = require("../controllers/users.js");

// SIGNUP
router.route("/signup")
    .get(usersControllers.signup_Page_Render)
    .post(WrapAsync(usersControllers.user_Signup_On_Website));

// LOGIN
router.route("/login")
    .get(usersControllers.login_Page_Render)
    .post(
        saveRedirectUrl,
        passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
        usersControllers.login_User
    );

// LOGOUT
router.route("/logout").post(usersControllers.logout_User);

// CURRENT USER
router.route("/current").get(usersControllers.current_User);

module.exports = router;
