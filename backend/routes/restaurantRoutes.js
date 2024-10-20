// routes/restaurantRoutes.js
const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

/**
 * @swagger
 * /restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 */
router.post('/', restaurantController.createRestaurant);

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get all restaurants
 *     responses:
 *       200:
 *         description: A list of restaurants
 */
router.get('/', restaurantController.getAllRestaurants);

/**
 * @swagger
 * /restaurants/{id}:
 *   get:
 *     summary: Get restaurant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Restaurant details
 */
router.get('/:id', restaurantController.getRestaurantById);

/**
 * @swagger
 * /restaurants/{id}:
 *   put:
 *     summary: Update restaurant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 */
router.put('/:id', restaurantController.updateRestaurant);

/**
 * @swagger
 * /restaurants/{id}:
 *   delete:
 *     summary: Delete restaurant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 */
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;

