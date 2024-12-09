const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        // Step 1: Check if the username already exists
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (row) {
                // If user with that username exists
                return res.status(400).json({ error: 'Username is already taken.' });
            }

            // Step 2: Hash the password
            bcrypt.hash(password, saltRounds, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({ error: 'Error hashing password' });
                }

                // Step 3: Insert the new user into the database
                db.run(
                    `INSERT INTO users (username, password_hash) VALUES (?, ?)`,
                    [username, passwordHash],
                    function (err) {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }

                        // Return success response
                        return res.status(201).json({
                            message: 'User created successfully.',
                            userId: this.lastID,
                            username,
                        });
                    }
                );
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err || !user) return res.status(401).json({ error: 'Invalid credentials.' });

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials.' });

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};
