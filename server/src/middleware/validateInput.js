// Validates required fields for creating a new journal entry
function validateEntry(req, res, next) {
    const { question, response, date } = req.body;
    if (!question || !response || !date) {
        return res.status(400).json({ error: 'Question, response, and date are required.' });
    }
    next();
}

module.exports = validateEntry;
