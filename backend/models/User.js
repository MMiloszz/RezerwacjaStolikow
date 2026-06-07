const db = require("../database/db");

const User = {
    create: (username, email, password, callback) => {
        const sql = `
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)
        `;

        db.run(sql, [username, email, password], function (err) {
            callback(err, { id: this?.lastID, username, email });
        });
    },

    findByEmail: (email, callback) => {
        const sql = `
            SELECT * FROM users
            WHERE email = ?
        `;

        db.get(sql, [email], (err, user) => {
            callback(err, user);
        });
    }
};

module.exports = User;