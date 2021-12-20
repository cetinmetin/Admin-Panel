const express = require('express');
const Company = require("../model/company");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// GET ALL COMPANIES
router.post('/', async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
// ADD A COMPANY
router.post('/add',
    [
        check("companyName", "Company name is required").not().isEmpty(),
        check("legalNumber", "Legal number is required").not().isEmpty(),
        check("incorporationCountry", "Incorporation country is required").not().isEmpty(),
        check("website", "Website is required").not().isEmpty(),
    ], async (req, res) => {

        const company = new Company({
            companyName: req.body.companyName,
            legalNumber: req.body.legalNumber,
            incorporationCountry: req.body.incorporationCountry,
            website: req.body.website
        })

        try {
            const saveCompany = await company.save()
            res.json(saveCompany)
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }

    });
// DELETE COMPANY
router.post('/delete', async (req, res) => {
    try {
        const deletedCompany = await Company.deleteOne({ _id: req.body.companyID })
        res.send(deletedCompany)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
//UPDATE COMPANY
router.post('/update', async (req, res) => {
    try {
        const updatedCompany = await Company.updateOne({ _id: req.body.companyID }, {
            $set: {
                companyName: req.body.companyName,
                legalNumber: req.body.legalNumber,
                incorporationCountry: req.body.incorporationCountry,
                website: req.body.website
            }
        })
        res.send(updatedCompany)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


module.exports = router