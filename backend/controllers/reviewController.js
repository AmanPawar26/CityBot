const mysql = require('mysql2');
const { getConnection, releaseConnection } = require('../config/db');

// Helper function to get table name and ID column based on entity type
const getTableInfo = (entityType) => {
    switch (entityType.toLowerCase()) {
        case 'restaurant':
            return { tableName: 'restaurantreview', idColumn: 'RestaurantID' };
        case 'concert':
            return { tableName: 'concertreview', idColumn: 'ConcertID' };
        case 'exhibition':
            return { tableName: 'exhibitionreview', idColumn: 'ExhibitionID' };
        case 'theatreplay':
            return { tableName: 'theatreplayreview', idColumn: 'PlayID' };
        case 'thingstodo':
            return { tableName: 'thingstodoreview', idColumn: 'ActivityID' };
        default:
            throw new Error('Invalid entity type');
    }
};

// Create a new review
exports.createReview = async (req, res) => {
    const { entityType, entityId, rating, comment, reviewDate } = req.body;
    if (!entityType || !entityId || !rating || !comment || !reviewDate) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const { tableName, idColumn } = getTableInfo(entityType);

        const connection = await getConnection();
        const [result] = await connection.query(
            `INSERT INTO ${tableName} (${idColumn}, Rating, Comment, ReviewDate) VALUES (?, ?, ?, ?)`,
            [entityId, rating, comment, reviewDate]
        );
        releaseConnection(connection);
        console.log('Review created with ID:', result.insertId);
        res.status(201).json({ message: 'Review created successfully', reviewId: result.insertId });
    } catch (err) {
        console.error('Error creating review:', err.message);
        res.status(500).json({ message: 'Failed to create review' });
    }
};

// Retrieve all reviews for a specific entity type
exports.getAllReviews = async (req, res) => {
    const { entityType } = req.params;
    try {
        const { tableName } = getTableInfo(entityType);

        const connection = await getConnection();
        const [results] = await connection.query(`SELECT * FROM ${tableName}`);
        releaseConnection(connection);

        res.status(200).json(results);
    } catch (err) {
        console.error('Error retrieving reviews:', err.message);
        res.status(500).json({ message: 'Failed to retrieve reviews' });
    }
};

// Retrieve reviews by Entity ID and Entity Type
exports.getReviewsByEntity = async (req, res) => {
    const { entityType, entityId } = req.params;
    try {
        const { tableName, idColumn } = getTableInfo(entityType);

        const connection = await getConnection();
        const [results] = await connection.query(`SELECT * FROM ${tableName} WHERE ${idColumn} = ?`, [entityId]);
        releaseConnection(connection);

        res.status(200).json(results);
    } catch (err) {
        console.error('Error retrieving reviews:', err.message);
        res.status(500).json({ message: 'Failed to retrieve reviews' });
    }
};

// Update a review by ID and Entity Type
exports.updateReview = async (req, res) => {
    const { entityType, id } = req.params;
    const { rating, comment, reviewDate } = req.body;
    try {
        const { tableName } = getTableInfo(entityType);

        const connection = await getConnection();
        const [result] = await connection.query(
            `UPDATE ${tableName} SET Rating = ?, Comment = ?, ReviewDate = ? WHERE ReviewID = ?`,
            [rating, comment, reviewDate, id]
        );
        releaseConnection(connection);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.status(200).json({ message: 'Review updated successfully' });
    } catch (err) {
        console.error('Error updating review:', err.message);
        res.status(500).json({ message: 'Failed to update review' });
    }
};

// Delete a review by ID and Entity Type
exports.deleteReview = async (req, res) => {
    const { entityType, id } = req.params;
    try {
        const { tableName } = getTableInfo(entityType);

        const connection = await getConnection();
        const [result] = await connection.query(`DELETE FROM ${tableName} WHERE ReviewID = ?`, [id]);
        releaseConnection(connection);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        console.error('Error deleting review:', err.message);
        res.status(500).json({ message: 'Failed to delete review' });
    }
};