// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     responses:
 *       201:
 *         description: Review created successfully
 */
router.post('/', reviewController.createReview);

/**
 * @swagger
 * /reviews/entity/{entityType}:
 *   get:
 *     summary: Retrieve all reviews for a specific entity type
 *     parameters:
 *       - in: path
 *         name: entityType
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of reviews
 */
router.get('/entity/:entityType', reviewController.getAllReviews);

/**
 * @swagger
 * /reviews/entity/{entityType}/{entityId}:
 *   get:
 *     summary: Retrieve reviews by Entity ID and Entity Type
 *     parameters:
 *       - in: path
 *         name: entityType
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: entityId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reviews details
 */
router.get('/entity/:entityType/:entityId', reviewController.getReviewsByEntity);

/**
 * @swagger
 * /reviews/entity/{entityType}/{id}:
 *   put:
 *     summary: Update a review by ID and Entity Type
 *     parameters:
 *       - in: path
 *         name: entityType
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review updated successfully
 */
router.put('/entity/:entityType/:id', reviewController.updateReview);

/**
 * @swagger
 * /reviews/entity/{entityType}/{id}:
 *   delete:
 *     summary: Delete a review by ID and Entity Type
 *     parameters:
 *       - in: path
 *         name: entityType
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review deleted successfully
 */
router.delete('/entity/:entityType/:id', reviewController.deleteReview);

module.exports = router;
