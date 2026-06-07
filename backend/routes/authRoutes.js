const express = require("express");

const router = express.Router();

const {
    showLogin,
    showRegister,
    registerUser,
    loginUser,
    showDashboard,
    logoutUser
} = require("../controllers/authController");

const {
    isAuthenticated
} = require("../middleware/authMiddleware");

router.get("/login", showLogin);
router.post("/login", loginUser);

router.get("/register", showRegister);
router.post("/register", registerUser);

router.get("/dashboard", isAuthenticated, showDashboard);

router.get("/logout", logoutUser);

module.exports = router;