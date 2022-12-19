const express = require('express');
const router = express.Router();
const Durango = require('../models/Durango.model')

router.post('/durango', (req, res, next) => {
    Durango.create({
        optionString: req.body.optionString,
        msrp: req.body.msrp,
        imageURL: req.body.imageURL
    })
    .then(createdDurango => {
        res.send(createdDurango)
    })
    .catch(err => res.send(err))
})


router.get('/durango', (req, res, next) => {
    Durango.find()
    .then(foundDurango => {
        res.send(foundDurango)
    })
    .catch(err => res.send(err))
})

module.exports = router