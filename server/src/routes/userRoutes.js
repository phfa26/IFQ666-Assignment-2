// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: User signup
 *     description: Create a new user with username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Username or password missing
 */
router.post('/signup', userController.signup);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: Log in an existing user with username and password, returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns a JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', userController.login);

module.exports = router;
