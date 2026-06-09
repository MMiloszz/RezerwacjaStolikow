const Reservation = require('../models/Reservation');
const Table = require('../models/Table');

exports.getReservations = (req, res) => {
    const user_id = req.session.user.id;

    Reservation.getByUserId(user_id, (err, reservations) => {
        if (err) {
            return res.status(500).send('Błąd pobierania rezerwacji');
        }

        res.render('myReservations', { reservations });
    });
};

exports.showReservationForm = (req, res) => {
    Table.getAll((err, tables) => {
        if (err) {
            return res.status(500).send('Błąd pobierania stolików');
        }

        res.render('reservationForm', { tables });
    });
};

exports.createReservation = (req, res) => {
    const user_id = req.session.user.id;
    const { table_id, reservation_date, start_time, end_time, guest_count } = req.body;

    if (!table_id || !reservation_date || !start_time || !end_time || !guest_count) {
        return res.status(400).send('Wszystkie pola są wymagane');
    }

    Reservation.checkConflict(table_id, reservation_date, start_time, end_time, (err, conflict) => {
        if (err) {
            return res.status(500).send('Błąd sprawdzania dostępności');
        }

        if (conflict) {
            return res.send(`
            <h2>Stolik jest już zarezerwowany na wybrany termin.</h2>
            <a href="/reservations/add">Powrót do formularza</a>
            `);
        }

        Reservation.create(user_id, table_id, reservation_date, start_time, end_time, guest_count, (err) => {
            if (err) {
                return res.status(500).send('Błąd dodawania rezerwacji');
            }

            res.redirect('/reservations');
        });
    });
};

exports.cancelReservation = (req, res) => {
    const id = req.params.id;

    Reservation.getById(id, (err, reservation) => {
        if (err) {
            return res.status(500).send('Błąd pobierania rezerwacji');
        }

        if (!reservation) {
            return res.status(404).send('Nie znaleziono rezerwacji');
        }

        if (reservation.user_id !== req.session.user.id) {
            return res.status(403).send('Nie masz uprawnień do anulowania tej rezerwacji');
        }

        Reservation.cancel(id, (err) => {
            if (err) {
                return res.status(500).send('Błąd anulowania rezerwacji');
            }

            res.redirect('/reservations');
        });
    });
};
