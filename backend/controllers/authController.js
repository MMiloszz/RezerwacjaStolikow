const bcrypt = require("bcrypt");
const User = require("../models/User");

const showLogin = (req, res) => {
    res.render("login", { error: null });
};

const showRegister = (req, res) => {
    res.render("register", { error: null });
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.render("register", {
            error: "Wszystkie pola są wymagane."
        });
    }

    if (password.length < 6) {
        return res.render("register", {
            error: "Hasło musi mieć minimum 6 znaków."
        });
    }

    User.findByEmail(email, async (err, existingUser) => {
        if (err) {
            return res.render("register", {
                error: "Wystąpił błąd serwera."
            });
        }

        if (existingUser) {
            return res.render("register", {
                error: "Użytkownik z tym adresem email już istnieje."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        User.create(username, email, hashedPassword, (err) => {
            if (err) {
                return res.render("register", {
                    error: "Nie udało się utworzyć konta."
                });
            }

            res.redirect("/login");
        });
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("login", {
            error: "Podaj email i hasło."
        });
    }

    User.findByEmail(email, async (err, user) => {
        if (err) {
            return res.render("login", {
                error: "Wystąpił błąd serwera."
            });
        }

        if (!user) {
            return res.render("login", {
                error: "Nieprawidłowy email lub hasło."
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.render("login", {
                error: "Nieprawidłowy email lub hasło."
            });
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        res.redirect("/dashboard");
    });
};

const showDashboard = (req, res) => {
    res.render("dashboard", {
        user: req.session.user
    });
};

const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};

module.exports = {
    showLogin,
    showRegister,
    registerUser,
    loginUser,
    showDashboard,
    logoutUser
};