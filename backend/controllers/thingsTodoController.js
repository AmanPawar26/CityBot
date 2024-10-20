const mysql = require('mysql2');
const db = require('../config/db');
const { getConnection, releaseConnection } = require('../config/db');

// Create a new thing to do
exports.createThingToDo = async (req, res) => {
    const { activityName, category, description, location, contactInfo, openingHours, entryFee, accessibility, specialFeatures } = req.body;
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO thingstodo (ActivityName, Category, Description, Location, ContactInfo, OpeningHours, EntryFee, Accessibility, SpecialFeatures) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                activityName, category, description, location, contactInfo, openingHours, entryFee, accessibility, specialFeatures
            ]
        );
        releaseConnection(connection);
        console.log('Thing to do created with ID:', result.insertId);
        res.status(201).json({ message: 'Thing to do created successfully', thingId: result.insertId });
    } catch (err) {
        console.error('Error creating thing to do:', err.message);
        res.status(500).json({ message: 'Failed to create thing to do' });
    }
};


// Retrieve all things to do
exports.getAllThingsToDo = async (req, res) => {
    let connection;
    try{
        const {category, location,  accessibility} = req.query;
        let query = `SELECT * FROM  Thingstodo WHERE 1=1`;

        // Adding conditions based on preference
        if (category) {
            query += ` AND category = '${category}'`;
            
        }
        if (location) {
            query += ` AND location LIKE '%${location}%'`;

        }
        if (accessibility) {
            query += ` AND accessibility = '${accessibility}'`;
        }
        console.log(query); // For debugging purposes
    connection = await db.getConnection();
    const [results] = await connection.query(query);
    if (results.length === 0) {
      // If no results are found, return a specific response
      res.status(200).json({ message: `No restaurants found for the given criteria.` });
    } else {
      res.status(200).json(results);
    }
} catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Failed to fetch restaurants.' });
  } finally {
    if (connection) db.releaseConnection(connection);
  }

};


// Retrieve a single thing to do by ID

exports.getThingToDoById = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        const [results] = await connection.query('SELECT * FROM thingsToDo WHERE ActivityId = ?', [id]);
        releaseConnection(connection);

        if (results.length === 0) {
            res.status(404).json({ message: 'Thing to do not found' });
            return;
        }

        res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error retrieving thing to do:', err.message);
        res.status(500).json({ message: 'Failed to retrieve thing to do' });
    }
};


// Update a thing to do by ID
exports.updateThingToDo = async (req, res) => {
    const { id } = req.params;
    const { activityName, category, description, location, contactInfo, openingHours, entryFee, accessibility, specialFeatures } = req.body;
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
            'UPDATE thingsToDo SET ActivityName = ?, Category = ?, Description = ?, Location = ?, ContactInfo = ?, OpeningHours = ?, EntryFee = ?, Accessibility = ?, SpecialFeatures = ? WHERE ActivityId = ?',
            [
                activityName, category, description, location, contactInfo, openingHours, entryFee, accessibility, specialFeatures, id
            ]
        );
        releaseConnection(connection);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Thing to do not found' });
            return;
        }

        res.status(200).json({ message: 'Thing to do updated successfully' });
    } catch (err) {
        console.error('Error updating thing to do:', err.message);
        res.status(500).json({ message: 'Failed to update thing to do' });
    }
};


// Delete a thing to do by ID
exports.deleteThingToDo = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        const [result] = await connection.query('DELETE FROM thingsToDo WHERE ActivityId = ?', [id]);
        releaseConnection(connection);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Thing to do not found' });
            return;
        }

        res.status(200).json({ message: 'Thing to do deleted successfully' });
    } catch (err) {
        console.error('Error deleting thing to do:', err.message);
        res.status(500).json({ message: 'Failed to delete thing to do' });
    }
};