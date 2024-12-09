function validateEntry(req, res, next) {
    const { question, response, date } = req.body;
    if (!question || !date) {
        return res.status(400).json({ error: 'Question and date are required.' });
    }
    next();
}

module.exports = validateEntry;
