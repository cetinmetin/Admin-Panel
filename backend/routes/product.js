const express = require('express');
const Product = require("../model/product");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// GET ALL PRODUCTS
router.post('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
// ADD A PRODUCT
router.post('/add',
    [
        check("productName", "Product name is required").not().isEmpty(),
        check("category", "Category name is required").not().isEmpty(),
        check("productAmount", "Product amount is required").not().isEmpty(),
        check("amountUnit", "Amount Unit is required").not().isEmpty(),
        check("company", "Company name is required").not().isEmpty(),
    ], async (req, res) => {

        const product = new Product({
            productName: req.body.productName,
            category: req.body.category,
            productAmount: req.body.productAmount,
            amountUnit: req.body.amountUnit,
            company: req.body.company
        })

        try {
            const saveProduct = await product.save()
            res.json(saveProduct)
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }

    });
// DELETE PRODUCT
router.post('/delete', async (req, res) => {
    try {
        const deletedProduct = await Product.deleteOne({ _id: req.body.productID })
        res.send(deletedProduct)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
//UPDATE PRODUCT
router.post('/update', async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne({ _id: req.body.productID }, {
            $set: {
                productName: req.body.productName,
                category: req.body.category,
                productAmount: req.body.productAmount,
                amountUnit: req.body.amountUnit,
                company: req.body.company,
            }
        })
        res.send(updatedProduct)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


module.exports = router