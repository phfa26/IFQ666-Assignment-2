const express = require('express');
const entryController = require('../controllers/entryController');
const authenticateToken = require('../middleware/authMiddleware');
const validateEntry = require('../middleware/validateInput');

const router = express.Router();

router.get('/', authenticateToken, entryController.getAllEntries);
router.post('/', authenticateToken, validateEntry, entryController.addEntry);
router.put('/:id', authenticateToken, entryController.updateEntry);
router.delete('/:id', authenticateToken, entryController.deleteEntry);

module.exports = router;
