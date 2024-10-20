// routes/theatreplayRoutes.js
const express = require('express');
const router = express.Router();
const theatreplayController = require('../controllers/theatreplayController');

/**
 * @swagger
 * /theatre-plays:
 *   post:
 *     summary: Create a new theatre play
 *     responses:
 *       201:
 *         description: Theatre play created successfully
 */
router.post('/', theatreplayController.createTheatrePlay);

/**
 * @swagger
 * /theatre-plays:
 *   get:
 *     summary: Get all theatre plays
 *     responses:
 *       200:
 *         description: A list of theatre plays
 */
router.get('/', theatreplayController.getAllTheatrePlays);

/**
 * @swagger
 * /theatre-plays/{id}:
 *   get:
 *     summary: Get theatre play by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Theatre play details
 */
router.get('/:id', theatreplayController.getTheatrePlayById);

/**
 * @swagger
 * /theatre-plays/{id}:
 *   put:
 *     summary: Update theatre play by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Theatre play updated successfully
 */
router.put('/:id', theatreplayController.updateTheatrePlay);

/**
 * @swagger
 * /theatre-plays/{id}:
 *   delete:
 *     summary: Delete theatre play by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Theatre play deleted successfully
 */
router.delete('/:id', theatreplayController.deleteTheatrePlay);

module.exports = router;

