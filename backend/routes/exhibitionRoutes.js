// routes/exhibitionRoutes.js
const express = require('express');
const router = express.Router();
const exhibitionController = require('../controllers/exhibitionController');

/**
 * @swagger
 * /exhibitions:
 *   post:
 *     summary: Create a new exhibition
 *     responses:
 *       201:
 *         description: Exhibition created successfully
 */
router.post('/', exhibitionController.createExhibition);

/**
 * @swagger
 * /exhibitions:
 *   get:
 *     summary: Get all exhibitions
 *     responses:
 *       200:
 *         description: A list of exhibitions
 */
router.get('/', exhibitionController.getAllExhibitions);

/**
 * @swagger
 * /exhibitions/{id}:
 *   get:
 *     summary: Get exhibition by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exhibition details
 */
router.get('/:id', exhibitionController.getExhibitionById);

/**
 * @swagger
 * /exhibitions/{id}:
 *   put:
 *     summary: Update exhibition by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exhibition updated successfully
 */
router.put('/:id', exhibitionController.updateExhibition);

/**
 * @swagger
 * /exhibitions/{id}:
 *   delete:
 *     summary: Delete exhibition by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exhibition deleted successfully
 */
router.delete('/:id', exhibitionController.deleteExhibition);

module.exports = router;
