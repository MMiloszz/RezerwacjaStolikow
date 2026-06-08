const Table = require('../models/Table');

exports.getTables = (req, res) => {
    Table.getAll((err, tables) => {
        if (err) {
            return res.status(500).send('Błąd pobierania stolików');
        }

        res.render('tables', { tables });
    });
};

exports.createTable = (req, res) => {
    const { table_number, seats } = req.body;

    if (!table_number || !seats) {
        return res.status(400).send('Wszystkie pola są wymagane');
    }

    Table.getByTableNumber(table_number, (err, existingTable) => {

        if (err) {
            return res.status(500).send('Błąd sprawdzania stolika');
        }

        if (existingTable) {
            return res.send(`
            <h2>Stolik o takim numerze już istnieje.</h2>
            <a href="/tables">Powrót do listy stolików</a>
            `);
        }

        Table.create(table_number, seats, (err) => {

            if (err) {
                return res.status(500).send('Błąd dodawania stolika');
            }

            res.redirect('/tables');
        });
    });
};

exports.deleteTable = (req, res) => {
    const id = req.params.id;

    Table.deleteById(id, (err) => {
        if (err) {
            return res.status(500).send('Błąd usuwania stolika');
        }

        res.redirect('/tables');
    });
};

exports.showEditForm = (req, res) => {
    const id = req.params.id;

    Table.getById(id, (err, table) => {
        if (err) {
            return res.status(500).send('Błąd pobierania stolika');
        }

        if (!table) {
            return res.status(404).send('Nie znaleziono stolika');
        }

        res.render('editTable', { table });
    });
};

exports.updateTable = (req, res) => {
    const id = req.params.id;
    const { table_number, seats } = req.body;

    Table.update(id, table_number, seats, (err) => {
        if (err) {
            return res.status(500).send('Błąd aktualizacji stolika');
        }

        res.redirect('/tables');
    });
};