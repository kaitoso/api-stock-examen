const { Sale } = require("../models/sale");
const { errorHandler } = require("../helpers/dbErrorHandler");

// middlewares rest 

exports.saleById = (req, res, next, id) => {
    Sale.findById(id)
        .populate("products.product", "name price")
        .exec((err, sale) => {
            if (err || !sale) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.sale = sale;
            next();
        });
};

exports.create = (req, res) => {
    req.body.sale.user = req.profile;
    const sale = new Sale(req.body.sale);
    sale.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(data);
    });
};

exports.listSales = (req, res) => {
    Sale.find()
        .populate("user", "_id name address")
        .sort("-created")
        .exec((err, sales) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(sales);
        });
};

exports.getStatusValues = (req, res) => {
    res.json(Sale.schema.path("status").enumValues);
};

exports.updateSaleStatus = (req, res) => {
    Sale.update(
        { _id: req.body.SaleId },
        { $set: { status: req.body.status } },
        (err, sale) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(sale);
        }
    );
};