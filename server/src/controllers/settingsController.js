const db = require('../models/db');

exports.getSettings = (req, res) => {
    db.get(`SELECT * FROM settings WHERE user_id = ?`, [req.user.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row || {});
    });
};

exports.updateSettings = (req, res) => {
    const { font_size, reminder_time } = req.body;

    // Check if the settings exist for the user
    db.get(`SELECT * FROM settings WHERE user_id = ?`, [req.user.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (row) {
            // If settings exist, update them
            db.run(
                `UPDATE settings SET font_size = ?, reminder_time = ? WHERE user_id = ?`,
                [font_size, reminder_time, req.user.id],
                function (err) {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.json({ updated: this.changes });
                }
            );
        } else {
            // If settings do not exist, insert new settings
            db.run(
                `INSERT INTO settings (user_id, font_size, reminder_time) VALUES (?, ?, ?)`,
                [req.user.id, font_size || 16, reminder_time || '09:00'], // Provide defaults if necessary
                function (err) {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.json({ created: this.lastID });
                }
            );
        }
    });
};

