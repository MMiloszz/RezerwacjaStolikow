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

    static getById(id, callback) {
    db.get(
        'SELECT * FROM tables WHERE id = ?',
        [id],
        callback
        );
    }

    static update(id, table_number, seats, callback) {
    db.run(
        'UPDATE tables SET table_number = ?, seats = ? WHERE id = ?',
        [table_number, seats, id],
        callback
        );
    }

    static getByTableNumber(table_number, callback) {
    db.get(
        'SELECT * FROM tables WHERE table_number = ?',
        [table_number],
        callback
    );
}
}

module.exports = Table;