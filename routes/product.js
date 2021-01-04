const express = require("express");
const router = express.Router();

const {
    create,
    productById,
    read,
    remove,
    update,
    list,
    listBySearch,
    photo,
    listSearch
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// routes
router.get("/product/:productId", read);
/**
 * @swagger
 * /api/product/:productId:
 *  get:
 *    summary: product by id
 *    description: Use to get a product
 *    responses:
 *      "200":
 *        description: A successful response
 */
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
/**
 * @swagger   
 * /api/product/create/:userId: 
 *  post:
 *    summary: product create
 *    description: Use to create a product
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              name:
 *                  type: string
 *                  description: name product
 *              description:
 *                  type: string
 *                  description: description product
 *              price:
 *                  type: number
 *                  description:
 *              quantity:
 *                  type: number
 *                  description:
 *              sold:
 *                  type: number
 *                  description:
 *              photo:
 *                  type: string
 *                  description: 
 *              
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
router.delete(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
/**
 * @swagger   
 * api/product/:productId/:userId: 
 *  delete:
 *    summary: product delete
 *    description: use to delete a product
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            
 *              
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
router.put(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);
/**
 * @swagger   
 * /api/product/:productId/:userId: 
 *  put:
 *    summary: product modify
 *    description: Use to modify a product
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              name:
 *                  type: string
 *                  description: name product
 *              description:
 *                  type: string
 *                  description: description product
 *              price:
 *                  type: number
 *                  description:
 *              quantity:
 *                  type: number
 *                  description:
 *              sold:
 *                  type: number
 *                  description:
 *              photo:
 *                  type: string
 *                  description: 
 *              
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */

router.get("/products", list);
/**
 * @swagger
 * /api/products/:
 *  get:
 *    summary: products list
 *    description: Use to get a products
 *    responses:
 *      "200":
 *        description: A successful response
 */
router.get("/products/search", listSearch);
/**
 * @swagger
 * /api/products/search:
 *  get:
 *    summary: product by search parameter
 *    description: Use to get a products by search parameters
 *    responses:
 *      "200":
 *        description: A successful response
 */
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);
/**
 * @swagger
 * /api/products/photo/:productId:
 *  get:
 *    summary: get a photo the product
 *    description: Use to get a product photo
 *    responses:
 *      "200":
 *        description: A successful response
 */

// params
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
