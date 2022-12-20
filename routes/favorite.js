const express = require('express');
const router = express.Router();
const Favorites = require('../models/Favorite.model')
const Durango = require('../models/Durango.model')
const User = require('../models/User.model')

router.post('/myFavorites', (req, res, next) => { //isAuth middleware
    Favorites.create({
        myCar: req.body.myCar,
        user: req.payload._id //req.payload._id
    })
    .then(createdFavorite => {
        return (
            User.findByIdAndUpdate(createdFavorite.user, {
                $push: {
                    favorite: createdFavorite._id
                }
            }, { new: true })
        )
    })

    .then(updatedUser => {
        res.send(updatedUser)
    })

    .catch(err => res.send(err))
})


router.get('/myFavorites', (req, res, next) => {
    Favorites.find({
    user: req.payload._id
    })
    .populate('myCar')
    .then(foundFavorites => {
        res.send(foundFavorites)
    })
    .catch(err => res.send(err))
})

module.exports = router