// routes/thingsTodoRoutes.js
const express = require('express');
const router = express.Router();
const thingsTodoController = require('../controllers/thingsTodoController');

/**
 * @swagger
 * /things-to-do:
 *   post:
 *     summary: Create a new thing to do
 *     responses:
 *       201:
 *         description: Thing to do created successfully
 */
router.post('/', thingsTodoController.createThingToDo);

/**
 * @swagger
 * /things-to-do:
 *   get:
 *     summary: Get all things to do
 *     responses:
 *       200:
 *         description: A list of things to do
 */
router.get('/', thingsTodoController.getAllThingsToDo);

/**
 * @swagger
 * /things-to-do/{id}:
 *   get:
 *     summary: Get thing to do by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thing to do details
 */
router.get('/:id', thingsTodoController.getThingToDoById);

/**
 * @swagger
 * /things-to-do/{id}:
 *   put:
 *     summary: Update thing to do by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thing to do updated successfully
 */
router.put('/:id', thingsTodoController.updateThingToDo);

/**
 * @swagger
 * /things-to-do/{id}:
 *   delete:
 *     summary: Delete thing to do by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thing to do deleted successfully
 */
router.delete('/:id', thingsTodoController.deleteThingToDo);

module.exports = router;
