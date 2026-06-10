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

        const today = new Date();
        const minDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
            .toISOString()
            .split('T')[0];

        res.render('reservationForm', { tables, minDate });
    });
};

exports.createReservation = (req, res) => {
    const user_id = req.session.user.id;
    const { table_id, reservation_date, start_time, end_time, guest_count } = req.body;
    const tableId = Number(table_id);
    const guests = Number(guest_count);

    if (!table_id || !reservation_date || !start_time || !end_time || !guest_count) {
        return res.status(400).send('Wszystkie pola są wymagane');
    }

    const startDateTime = new Date(`${reservation_date}T${start_time}`);
    const endDateTime = new Date(`${reservation_date}T${end_time}`);
    const now = new Date();

    if (Number.isNaN(startDateTime.getTime()) || Number.isNaN(endDateTime.getTime())) {
        return res.status(400).send('Nieprawidłowa data lub godzina');
    }

    if (startDateTime < now) {
        return res.status(400).send('Nie można wybrać daty ani godziny z przeszłości');
    }

    if (endDateTime <= startDateTime) {
        return res.status(400).send('Godzina końca musi być później niż godzina rozpoczęcia');
    }

    if (endDateTime.getTime() - startDateTime.getTime() < 60 * 60 * 1000) {
        return res.status(400).send('Minimalny czas rezerwacji to 1 godzina');
    }

    Table.getById(tableId, (err, table) => {
        if (err) {
            return res.status(500).send('Błąd pobierania stolika');
        }

        if (!table) {
            return res.status(400).send('Wybrany stolik nie istnieje');
        }

        if (guests > table.seats) {
            return res.status(400).send(`Ten stolik ma maksymalnie ${table.seats} miejsc`);
        }

        Reservation.checkConflict(tableId, reservation_date, start_time, end_time, (err, conflict) => {
            if (err) {
                return res.status(500).send('Błąd sprawdzania dostępności');
            }

            if (conflict) {
                return res.send(`
            <h2>Stolik jest już zarezerwowany na wybrany termin.</h2>
            <a href="/reservations/add">Powrót do formularza</a>
            `);
            }

            Reservation.checkUserConflict(user_id, reservation_date, start_time, end_time, (err, userConflict) => {
                if (err) {
                    return res.status(500).send('Błąd sprawdzania dostępności');
                }

                if (userConflict) {
                    return res.status(400).send('Masz już inną aktywną rezerwację w tym terminie');
                }

                Reservation.create(user_id, tableId, reservation_date, start_time, end_time, guests, (err) => {
                    if (err) {
                        return res.status(500).send('Błąd dodawania rezerwacji');
                    }

                    res.redirect('/reservations');
                });
            });
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
