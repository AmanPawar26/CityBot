// routes/concertRoutes.js
const express = require('express');
const router = express.Router();
const concertController = require('../controllers/concertController');

/**
 * @swagger
 * /concerts:
 *   post:
 *     summary: Create a new concert
 *     responses:
 *       201:
 *         description: Concert created successfully
 */
router.post('/', concertController.createConcert);

/**
 * @swagger
 * /concerts:
 *   get:
 *     summary: Get all concerts
 *     responses:
 *       200:
 *         description: A list of concerts
 */
router.get('/', concertController.getAllConcerts);

/**
 * @swagger
 * /concerts/{id}:
 *   get:
 *     summary: Get concert by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Concert details
 */
router.get('/:id', concertController.getConcertById);

/**
 * @swagger
 * /concerts/{id}:
 *   put:
 *     summary: Update concert by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Concert updated successfully
 */
router.put('/:id', concertController.updateConcert);

/**
 * @swagger
 * /concerts/{id}:
 *   delete:
 *     summary: Delete concert by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Concert deleted successfully
 */
router.delete('/:id', concertController.deleteConcert);

module.exports = router;
