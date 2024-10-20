// config/db.js

const mysql = require('mysql2/promise'); // Use the promise-compatible version

require('dotenv').config();

// Database connection configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10, // Adjust this based on your requirements
});


// Get a connection from the pool
const getConnection = async () => {
  try {
    return await pool.getConnection();
  } catch (err) {
    console.error('Error getting database connection:', err);
    throw err;
  }
};

// Release connection back to the pool
const releaseConnection = (connection) => {
  connection.release();
};

module.exports = { getConnection, releaseConnection };
