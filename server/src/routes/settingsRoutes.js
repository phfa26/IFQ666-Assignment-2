// routes/settingsRoutes.js
const express = require('express');
const settingsController = require('../controllers/settingsController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Get settings for the authenticated user
 *     description: Retrieve the current settings for the authenticated user.
 *     responses:
 *       200:
 *         description: Settings data
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken, settingsController.getSettings);

/**
 * @swagger
 * /api/settings:
 *   put:
 *     summary: Update user settings
 *     description: Modify the settings for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               font_size:
 *                 type: integer
 *               reminder_time:
 *                 type: string
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/', authenticateToken, settingsController.updateSettings);

module.exports = router;
