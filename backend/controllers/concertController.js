const mysql = require('mysql2');
const db = require('../config/db');
const { getConnection, releaseConnection } = require('../config/db');

// Create a new concert
exports.createConcert = async (req, res) => {
    const { concertName, artistName, venue, genre, language, dateAndTime, description, ticketInformation, contactInformation, specialAppearance } = req.body;
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO Concert (concertName, artistName, venue, genre, language, dateAndTime, description, ticketInformation, contactInformation, specialAppearance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                concertName, artistName, venue, genre, language, dateAndTime, 
                description, JSON.stringify(ticketInformation), JSON.stringify(contactInformation), specialAppearance
            ]
        );
        releaseConnection(connection);
        console.log('Concert created with ID:', result.insertId);
        res.status(201).json({ message: 'Concert created successfully', concertId: result.insertId });
    } catch (err) {
        console.error('Error creating concert:', err.message);
        res.status(500).json({ message: 'Failed to create concert' });
    }
};

// Retrieve all concerts
exports.getAllConcerts = async (req, res) => {
    let connection;
    try {
        const { genre, language, artistName, venue } = req.query;
        let query = `SELECT * FROM Concert WHERE 1=1`; 
        
        // Adding conditions based on my preference
        if (genre) {
            query += ` AND genre LIKE '%${genre}%'`;
        }
        if (language) {
            query += ` AND language LIKE '%${language}%'`;
        }
        if (artistName) {
            query += ` AND artistName LIKE '%${artistName}%'`;
        }
        if (venue) {
            query += ` AND venue LIKE '%${venue}%'`;
        }
        
        console.log(query);
        connection = await db.getConnection();
        const [results] = await connection.query(query);
        if (results.length === 0) {
            // If no results are found, return a specific response
      res.status(200).json({ message: `No concerts found for the given criteria.` });
       } else {
        res.status(200).json(results);
       }
        
    } catch (error) {
        console.error('Error retrieving concerts:', error);
        res.status(500).json({ message: 'Failed to retrieve concerts' });
    } finally {

        if (connection) db.releaseConnection(connection);

    }
};



// Retrieve a single concert by ID
exports.getConcertById = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        const [results] = await connection.query('SELECT * FROM Concert WHERE concertId = ?', [id]);
        releaseConnection(connection);
        if (results.length === 0) {
            res.status(404).json({ message: 'Concert not found' });
            return;
        }

        // Filter out empty fields
        const concertData = results[0];
        const filteredConcertData = {};
        for (const key in concertData) {
            if (concertData[key] !== null && concertData[key] !== '') {
                filteredConcertData[key] = concertData[key];
            }
        }

        res.status(200).json(filteredConcertData);
    } catch (err) {
        console.error('Error retrieving concert:', err.message);
        res.status(500).json({ message: 'Failed to retrieve concert' });
    }
};


// Update a concert by ID
exports.updateConcert = async (req, res) => {
    const { id } = req.params;
    const { concertName, artistName, venue, genre, language, dateAndTime, description, ticketInformation, contactInformation, specialAppearance } = req.body;
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
            'UPDATE Concert SET concertName = ?, artistName = ?, venue = ?, genre = ?, language = ?, dateAndTime = ?, description = ?, ticketInformation = ?, contactInformation = ?, specialAppearance = ? WHERE concertId = ?',
            [
                concertName, artistName, venue, genre, language, dateAndTime,
                description, JSON.stringify(ticketInformation), JSON.stringify(contactInformation), specialAppearance, id
            ]
        );
        releaseConnection(connection);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Concert not found' });
            return;
        }
        res.status(200).json({ message: 'Concert updated successfully' });
    } catch (err) {
        console.error('Error updating concert:', err.message);
        res.status(500).json({ message: 'Failed to update concert' });
    }
};

// Delete a concert by ID
exports.deleteConcert = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        const [result] = await connection.query('DELETE FROM Concert WHERE concertId = ?', [id]);
        releaseConnection(connection);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Concert not found' });
            return;
        }
        res.status(200).json({ message: 'Concert deleted successfully' });
    } catch (err) {
        console.error('Error deleting concert:', err.message);
        res.status(500).json({ message: 'Failed to delete concert' });
    }
};