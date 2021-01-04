const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const {create, update, status} = require('../controllers/button');
const { userById } = require("../controllers/user");
// Get global messages
router.post("/button/create/:userId", requireSignin, isAuth, isAdmin, create);
/**
 * @swagger   
 * /api/button/create: 
 *  post:
 *    summary: create the button realtime
 *    description: Use to create button
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              status:
 *                  type: boolean
 *                  description: true or false value
 *              
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
router.put("/button/update/:userId", requireSignin, isAuth, isAdmin, update);
/**
 * @swagger   
 * /api/button/update: 
 *  put:
 *    summary: update status button
 *    description: Use to update button
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              status:
 *                  type: boolean
 *                  description: true or false value
 *              
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
router.get("/button/", status);
/**
 * @swagger
 * /api/button:
 *  get:
 *    summary: status button
 *    description: Use to get status to the button
 *    responses:
 *      "200":
 *        description: A successful response
 */
router.param("userId", userById);
module.exports = router;