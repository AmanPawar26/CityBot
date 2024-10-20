const db = require('../config/db');

const findUserByEmail = async (email) => {
    let connection;
    try {
        connection = await db.getConnection();
        const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    } catch (err) {
        console.error('Error finding user by email:', err);
        throw err;
    } finally {
        if (connection) db.releaseConnection(connection);
    }
};

const createUser = async (username, email, password) => {
    let connection;
    try {
        connection = await db.getConnection();
        await connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    } finally {
        if (connection) db.releaseConnection(connection);
    }
};

module.exports = { findUserByEmail, createUser };
