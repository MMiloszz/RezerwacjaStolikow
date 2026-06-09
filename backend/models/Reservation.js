const db = require('../database/db');

class Reservation {
    static getAll(callback) {
        db.all('SELECT * FROM reservations', [], callback);
    }

    static getByUserId(user_id, callback) {
        db.all(
            'SELECT r.*, t.table_number, t.seats FROM reservations r JOIN tables t ON r.table_id = t.id WHERE r.user_id = ? ORDER BY r.reservation_date DESC, r.start_time DESC',
            [user_id],
            callback
        );
    }

    static getById(id, callback) {
        db.get(
            'SELECT * FROM reservations WHERE id = ?',
            [id],
            callback
        );
    }

    static create(user_id, table_id, reservation_date, start_time, end_time, guest_count, callback) {
        db.run(
            'INSERT INTO reservations (user_id, table_id, reservation_date, start_time, end_time, guest_count, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [user_id, table_id, reservation_date, start_time, end_time, guest_count, 'active'],
            callback
        );
    }

    static cancel(id, callback) {
        db.run(
            'UPDATE reservations SET status = ? WHERE id = ?',
            ['cancelled', id],
            callback
        );
    }

    static checkConflict(table_id, reservation_date, start_time, end_time, callback) {
        db.get(
            `SELECT * FROM reservations 
             WHERE table_id = ? 
             AND reservation_date = ? 
             AND status = 'active'
             AND ((start_time < ? AND end_time > ?) OR (start_time < ? AND end_time > ?) OR (start_time >= ? AND end_time <= ?))`,
            [table_id, reservation_date, end_time, start_time, end_time, start_time, start_time, end_time],
            callback
        );
    }
}

module.exports = Reservation;
