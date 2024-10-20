// routes/authRoutes.js
const express = require('express');
const { register, login, resetPassword } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset a user's password
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
router.post('/reset-password', resetPassword);

module.exports = router;
