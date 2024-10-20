const mysql = require('mysql2');
const db = require('../config/db');
const { getConnection, releaseConnection } = require('../config/db');

// Create a new exhibition
exports.createExhibition = async (req, res) => {
    const { eventName, eventType, theme, venue, dateAndTime, description, exhibitors, attractions, ticketInformation, contactInformation, specialFeatures } = req.body;
    try {
        const connection = await getConnection();
        const formattedDateAndTime = new Date(dateAndTime).toISOString().slice(0, 19).replace('T', ' ');
        const [result] = await connection.query(
            'INSERT INTO Exhibition (eventName, eventType, theme, venue, dateAndTime, description, exhibitors, attractions, ticketInformation, contactInformation, specialFeatures) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                eventName, eventType, theme, venue, formattedDateAndTime, description, exhibitors, attractions,
                JSON.stringify(ticketInformation), JSON.stringify(contactInformation), specialFeatures
            ]
        );
        releaseConnection(connection);
        console.log('Exhibition created with ID:', result.insertId);
        res.status(201).json({ message: 'Exhibition created successfully', exhibitionId: result.insertId });
    } catch (err) {
        console.error('Error creating exhibition:', err.message);
        res.status(500).json({ message: 'Failed to create exhibition' });
    }
};

// Retrieve all exhibitions
exports.getAllExhibitions = async (req, res) => {
   let connection;
   try {
    const {eventType, theme, venue, exhibitors} = req.query;
    let query = `SELECT * FROM Exhibition WHERE 1=1`;

    // Adding conditions based on my preference
    if (eventType) {
        query += ` AND eventType = '${eventType}'`;
    }
    if (theme) {
        query += ` AND theme = '${theme}'`;
    }
    if (venue) {
        query += ` AND venue LIKE '%${venue}%'`;
    }
    if (exhibitors) {
        query += ` AND exhibitors LIKE '%${exhibitors}%'`;
    }

    console.log(query); // For debugging purposes
    connection = await db.getConnection();
    const [results] = await connection.query(query);
    if (results.length === 0) {
        // If no results are found, return a specific response
        res.status(200).json({ message: `No exhibitions found for the given criteria.` });
      } else {
        res.status(200).json(results);
      }
    } catch (error) {
        console.error('Error fetching exhibitions:', error);
        res.status(500).json({ message: 'Failed to fetch exhibitions.' });
      } finally {
        if (connection) db.releaseConnection(connection);
      }

};


// Retrieve a single exhibition by ID
exports.getExhibitionById = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        const [results] = await connection.query('SELECT * FROM Exhibition WHERE ExhibitionID = ?', [id]);
        releaseConnection(connection);

        if (results.length === 0) {
            res.status(404).json({ message: 'Exhibition not found' });
            return;
        }

        // Clean and parse the JSON fields
        const exhibition = results[0];
        const cleanedExhibition = {};
        for (const key in exhibition) {
            if (exhibition[key] && key !== 'ticketInformation' && key !== 'contactInformation') {
                cleanedExhibition[key] = exhibition[key];
            }
        }
        // Conditionally parse and add JSON fields
        if (exhibition.ticketInformation) {
            cleanedExhibition.ticketInformation = JSON.parse(exhibition.ticketInformation);
        }
        if (exhibition.contactInformation) {
            cleanedExhibition.contactInformation = JSON.parse(exhibition.contactInformation);
        }

        res.status(200).json(cleanedExhibition);
    } catch (err) {
        console.error('Error retrieving exhibition:', err.message);
        res.status(500).json({ message: 'Failed to retrieve exhibition' });
    }
};


// Update an exhibition by ID
exports.updateExhibition = async (req, res) => {
    const { id } = req.params;
    const { eventName, eventType, theme, venue, dateAndTime, description, exhibitors, attractions, ticketInformation, contactInformation, specialFeatures } = req.body;
    try {
        const connection = await getConnection();
        const formattedDateAndTime = new Date(dateAndTime).toISOString().slice(0, 19).replace('T', ' ');
        const [result] = await connection.query(
            'UPDATE Exhibition SET eventName = ?, eventType = ?, theme = ?, venue = ?, dateAndTime = ?, description = ?, exhibitors = ?, attractions = ?, ticketInformation = ?, contactInformation = ?, specialFeatures = ? WHERE exhibitionId = ?',
            [
                eventName, eventType, theme, venue, formattedDateAndTime, description, exhibitors, attractions,
                JSON.stringify(ticketInformation), JSON.stringify(contactInformation), specialFeatures, id
            ]
        );
        releaseConnection(connection);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Exhibition not found' });
            return;
        }
        res.status(200).json({ message: 'Exhibition updated successfully' });
    } catch (err) {
        console.error('Error updating exhibition:', err.message);
        res.status(500).json({ message: 'Failed to update exhibition' });
    }
};

// Delete an exhibition by ID
exports.deleteExhibition = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        const [result] = await connection.query('DELETE FROM Exhibition WHERE ExhibitionID = ?', [id]);
        releaseConnection(connection);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Exhibition not found' });
            return;
        }
        res.status(200).json({ message: 'Exhibition deleted successfully' });
    } catch (err) {
        console.error('Error deleting exhibition:', err.message);
        res.status(500).json({ message: 'Failed to delete exhibition' });
    }
};