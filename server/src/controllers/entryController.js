const db = require('../models/db');

exports.getAllEntries = (req, res) => {
    db.all(`SELECT * FROM entries WHERE user_id = ?`, [req.user.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.addEntry = (req, res) => {
    const { question, response, date } = req.body;
    console.log(question, response, date )
    db.run(`INSERT INTO entries (user_id, question, response, date) VALUES (?, ?, ?, ?)`, [req.user.id, question, response, date], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, question, response, date });
    });
};

exports.updateEntry = (req, res) => {
    const { response } = req.body;
    db.run(`UPDATE entries SET response = ? WHERE id = ? AND user_id = ?`, [response, req.params.id, req.user.id], function (err) {

        if (err) return res.status(500).json({ error: err.message });
        res.json({ updated: this.changes });
    });
};

exports.deleteEntry = (req, res) => {
    db.run(`DELETE FROM entries WHERE id = ? AND user_id = ?`, [req.params.id, req.user.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
};
