// routes/entryRoutes.js
const express = require('express');
const entryController = require('../controllers/entryController');
const authenticateToken = require('../middleware/authMiddleware');
const validateEntry = require('../middleware/validateInput');

const router = express.Router();

/**
 * @swagger
 * /api/entries:
 *   get:
 *     summary: Get all journal entries
 *     description: Retrieve all journal entries for the authenticated user.
 *     responses:
 *       200:
 *         description: A list of entries
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken, entryController.getAllEntries);

/**
 * @swagger
 * /api/entries:
 *   post:
 *     summary: Create a new journal entry
 *     description: Add a new entry to the user's journal.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               response:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Entry created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, validateEntry, entryController.addEntry);

/**
 * @swagger
 * /api/entries/{id}:
 *   put:
 *     summary: Update a journal entry
 *     description: Modify an existing journal entry for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The entry ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               response:
 *                 type: string
 *     responses:
 *       200:
 *         description: Entry updated successfully
 *       404:
 *         description: Entry not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticateToken, entryController.updateEntry);

/**
 * @swagger
 * /api/entries/{id}:
 *   delete:
 *     summary: Delete a journal entry
 *     description: Remove a journal entry for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The entry ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entry deleted successfully
 *       404:
 *         description: Entry not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticateToken, entryController.deleteEntry);

module.exports = router;
