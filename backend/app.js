const express = require("express");
const session = require("express-session");

require("./database/initDb");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Obsługa danych z formularzy
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ustawienie EJS jako silnika widoków
app.set("view engine", "ejs");
app.set("views", "views");

// Sesje użytkowników
app.use(
    session({
        secret: "tajny_klucz_sesji",
        resave: false,
        saveUninitialized: false
    })
);

// Strona główna
app.get("/", (req, res) => {
    res.redirect("/login");
});

// Routing autoryzacji
app.use("/", authRoutes);

// Obsługa błędu 404
app.use((req, res) => {
    res.status(404).send("Nie znaleziono strony");
});

// Start serwera
app.listen(3000, () => {
    console.log("Serwer działa na porcie 3000");
});