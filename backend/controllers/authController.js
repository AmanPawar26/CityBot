const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/User');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        await createUser(username, email, hashedPassword);

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const resetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ msg: 'Email not found' });
        }

        // TODO: Implement sending a reset email
        res.json({ msg: 'Password reset link sent' });
    } catch (err) {
        console.error('Error resetting password:', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = { register, login, resetPassword };
