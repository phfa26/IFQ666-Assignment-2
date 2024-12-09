const db = require('../models/db');

exports.getSettings = (req, res) => {
    db.get(`SELECT * FROM settings WHERE user_id = ?`, [req.user.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row || {});
    });
};

exports.updateSettings = (req, res) => {
    const { font_size, reminder_time } = req.body;
    db.run(`UPDATE settings SET font_size = ?, reminder_time = ? WHERE user_id = ?`, [font_size, reminder_time, req.user.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updated: this.changes });
    });
};
