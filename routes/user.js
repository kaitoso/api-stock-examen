const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin} = require("../controllers/auth");

const {userById, read, update}= require("../controllers/user");

//routes
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req,res)=>{res.json({user: req.profile});});
/**
 * @swagger
 * /api/secret/:userId:
 *  get:
 *    summary: secret
 *    description: Use to get token
 *    responses:
 *      "200":
 *        description: A successful response
 */
router.get("/user/:userId", requireSignin, isAuth, read);
/**
 * @swagger
 * /api/user/:userId:
 *  get:
 *    summary: read user
 *    description: get a user by id
 *    responses:
 *      "200":
 *        description: A successful response
 */
router.put("/user/:userId", requireSignin, isAuth, update);
/**
 * @swagger   
 * /api/user/:userId: 
 *  put:
 *    summary: update user
 *    description: Use to update user
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              name:
 *                  type: string
 *                  description: 
 *              lastname:
 *                  type: string
 *                  description: 
 *              username:
 *                  type: string
 *                  description: 
 *              email:
 *                  type: string
 *                  description: 
 *              rut:
 *                  type: string
 *                  description: 
 *              password:
 *                  type: string
 *                  description:
 *              address:
 *                  type: string
 *                  description:
 *              permission:
 *                  type: number
 *                  description:
 *              avatar:
 *                  type: string
 *                  description:  
 *    
 *  
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */

//params 
router.param("userId", userById);

module.exports = router;