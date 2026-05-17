const express = require('express')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const usersController = require('../controllers/usersController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Something went wrong
 */
router.get('/', usersController.getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - names
 *               - email
 *             properties:
 *               names:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Max Mustermann
 *                   - Anna Schmidt
 *               email:
 *                 type: string
 *                 example: max@example.com
 *     responses:
 *       200:
 *         description: User created successfully
 *       500:
 *         description: User could not be created
 */
router.post('/', usersController.createUser);

module.exports = router;