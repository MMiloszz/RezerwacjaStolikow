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

    Table.create(table_number, seats, (err) => {
        if (err) {
            return res.status(500).send('Błąd dodawania stolika');
        }

        res.redirect('/tables');
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