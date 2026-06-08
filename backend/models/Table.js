const db = require('../database/db');

class Table {
    static getAll(callback) {
        db.all('SELECT * FROM tables', [], callback);
    }

    static create(table_number, seats, callback) {
        db.run(
            'INSERT INTO tables (table_number, seats) VALUES (?, ?)',
            [table_number, seats],
            callback
        );
    }

    static deleteById(id, callback) {
        db.run(
            'DELETE FROM tables WHERE id = ?',
            [id],
            callback
        );
    }
}

module.exports = Table;