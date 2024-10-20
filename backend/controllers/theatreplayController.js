const mysql = require('mysql2');
const db = require('../config/db');
const { getConnection, releaseConnection } = require('../config/db');

// Create a new theatre play
exports.createTheatrePlay = async (req, res) => {
    const { title, playwright, director, language, genre, synopsis, cast, venue, dateAndTime, duration, ticketInformation, contactInformation, specialFeatures } = req.body;
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO theatreplay (Title, Playwright, Director, Language, Genre, Synopsis, Cast, Venue, DateAndTime, Duration, TicketInformation, ContactInformation, SpecialFeatures) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                title, playwright, director, language, genre, synopsis, cast, venue, dateAndTime, duration,
                ticketInformation ? JSON.stringify(ticketInformation) : null,
                contactInformation ? JSON.stringify(contactInformation) : null,
                specialFeatures
            ]
        );
        releaseConnection(connection);
        console.log('Theatre play created with ID:', result.insertId);
        res.status(201).json({ message: 'Theatre play created successfully', playId: result.insertId });
    } catch (err) {
        console.error('Error creating theatre play:', err.message);
        res.status(500).json({ message: 'Failed to create theatre play' });
    }
};

// Retrieve all theatre plays
exports.getAllTheatrePlays = async (req, res) => {
    let connection;
    try {
        const { playwright, director, language, genre, cast, venue, duration } = req.query;
        let query = `SELECT * FROM Theatreplay WHERE 1=1`

        // Adding conditions based on preference
        if (playwright) {
            query += ` AND playwright = '${playwright}'`;
        }
        if (director) {
            query += ` AND director = '${director}'`;
        }
        if (language) {
            query += ` AND language = '${language}'`;
        }
        if (genre) {
            query += ` AND genre = '${genre}'`;
        }
        if (cast) {
            query += ` AND cast LIKE '%${cast}%'`;
        }
        if (venue) {
            query += ` AND venue = '${venue}'`;
        }
        if (duration) {
            query += ` AND duration = '${duration}'`;
        }
        console.log(query); // For debugging purposes
        connection = await db.getConnection();
        const [results] = await connection.query(query);
        if (results.length === 0) {
            // If no results are found, return a specific response
            res.status(200).json({ message: `No TheatrePlays found for the given criteria.` });
        } else {
            res.status(200).json(results);
        }
    } catch (error) {
        console.error('Error fetching TheatrePlays:', error);
        res.status(500).json({ message: 'Failed to fetch TheatrePlays.' });
    } finally {
        if (connection) db.releaseConnection(connection);
    }

};


// Retrieve a single theatre play by ID
exports.getTheatrePlayById = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        const [results] = await connection.query('SELECT * FROM TheatrePlay WHERE PlayId = ?', [id]);
        releaseConnection(connection);

        if (results.length === 0) {
            res.status(404).json({ message: 'Theatre play not found' });
            return;
        }

        // Clean and parse the JSON fields
        const theatrePlay = results[0];
        const cleanedTheatrePlay = {};
        for (const key in theatrePlay) {
            if (theatrePlay[key] !== null && theatrePlay[key] !== '' && key !== 'TicketInformation' && key !== 'ContactInformation') {
                cleanedTheatrePlay[key] = theatrePlay[key];
            }
        }
        // Conditionally parse and add JSON fields
        try {
            if (theatrePlay.TicketInformation) {
                cleanedTheatrePlay.TicketInformation = JSON.parse(theatrePlay.TicketInformation);
            }
            if (theatrePlay.ContactInformation) {
                cleanedTheatrePlay.ContactInformation = JSON.parse(theatrePlay.ContactInformation);
            }
        } catch (err) {
            console.error('Error parsing JSON:', err.message);
            // Handle JSON parsing error here, e.g., log the error or set a default value
        }

        res.status(200).json(cleanedTheatrePlay);
    } catch (err) {
        console.error('Error retrieving theatre play:', err.message);
        res.status(500).json({ message: 'Failed to retrieve theatre play' });
    }
};


// Update a theatre play by ID
exports.updateTheatrePlay = async (req, res) => {
    const { id } = req.params;
    const { title, playwright, director, language, genre, synopsis, cast, venue, dateAndTime, duration, ticketInformation, contactInformation, specialFeatures } = req.body;
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
            'UPDATE TheatrePlay SET Title = ?, Playwright = ?, Director = ?, Language = ?, Genre = ?, Synopsis = ?, Cast = ?, Venue = ?, DateAndTime = ?, Duration = ?, TicketInformation = ?, ContactInformation = ?, SpecialFeatures = ? WHERE PlayId = ?',
            [
                title, playwright, director, language, genre, synopsis, cast, venue, dateAndTime, duration,
                ticketInformation ? JSON.stringify(ticketInformation) : null,
                contactInformation ? JSON.stringify(contactInformation) : null,
                specialFeatures, id
            ]
        );
        releaseConnection(connection);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Theatre play not found' });
            return;
        }
        res.status(200).json({ message: 'Theatre play updated successfully' });
    } catch (err) {
        console.error('Error updating theatre play:', err.message);
        res.status(500).json({ message: 'Failed to update theatre play' });
    }
};

// Delete a theatre play by ID
exports.deleteTheatrePlay = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        const [result] = await connection.query('DELETE FROM TheatrePlay WHERE PlayId = ?', [id]);
        releaseConnection(connection);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Theatre play not found' });
            return;
        }
        res.status(200).json({ message: 'Theatre play deleted successfully' });
    } catch (err) {
        console.error('Error deleting theatre play:', err.message);
        res.status(500).json({ message: 'Failed to delete theatre play' });
    }
};