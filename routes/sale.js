const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {
    create,
    listSales,
    getStatusValues,
    saleById,
    updateSaleStatus
} = require("../controllers/sale");
const { decreaseQuantity } = require("../controllers/product");

// routes
router.post(
    "/sale/create/:userId",
    requireSignin,
    isAuth,
    decreaseQuantity,
    create
);
/**
 * @swagger   
 * /api/sale/create/:userId/:userId: 
 *  post:
 *    summary: create sale
 *    description: use to create sale
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              
 *              
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */

router.get("/sale/list/:userId", requireSignin, isAuth, isAdmin, listSales);
/**
 * @swagger
 * /api/sale/list/:userId:
 *  get:
 *    summary: list of sales by user
 *    description: Use to get a sales by user
 *    responses:
 *      "200":
 *        description: A successful response
 */
router.get(
    "/sale/status-values/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    getStatusValues
);
/**
 * @swagger
 * /api/sale/status-values/:userId:
 *  get:
 *    summary: list status values sale
 *    description: list status values sale
 *    responses:
 *      "200":
 *        description: A successful response
 */
router.put(
    "/sale/:saleId/status/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateSaleStatus
);
/**
 * @swagger   
 * /api/sale/:saleId/status/:userId: 
 *  put:
 *    summary: sale modify
 *    description: Use to modify a product
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              status:
 *                  type: string
 *                  description: name product
 *              
 *              
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */

// params
router.param("userId", userById);
router.param("saleId", saleById);

module.exports = router;
