var express = require('express');
var router = express.Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const bcryptjs = require('bcryptjs')
const User = require('../models/User.model')
const jwt = require('jsonwebtoken')


router.post('/signup', (req, res, next) => {

  const {email, password} = req.body
  
     if(!email || !password ) {
      return res.json({
          error: {
              message: 'Missing email, name, or password'
          }
      })
     }
;

bcryptjs.hash(password, 10)
.then(hashedPassword => {
     return (
         User.create({
             email,
             password: hashedPassword,
             
         })
     )
})
.then(createdUser => {
 res.json(createdUser)
})
.catch(err => res.send(err))

})


router.post('/login', (req, res, next) => {

  const { email, password } = req.body;

    if(!email || !password){
       return res.json({
        error: {
            message: 'Missing email or paswword'
        }
       })
    }

    let myUser;

    User.findOne({ email })
    .then(foundUser => {
        if(!foundUser){
            return Promise.reject('Invalid email or password')
        }
        myUser = foundUser
        return bcryptjs.compare(password, foundUser.password)
    })
    .then(isValidPassword => {
        if(!isValidPassword){
            return Promise.reject('Invalid email or password')
        }
        const payload = {
            _id: myUser._id,
            name: myUser.name,
            email: myUser.email
        };

        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            { algorithm: 'HS256', expiresIn: '6h' }
        )

        res.json({
            authToken: authToken
        });

    })
    .catch(err => res.status(400).send(err))


})

router.get('/verify', isAuthenticated, (req, res, next) => {
  res.status(200).json(req.myPayload);
});

router.get('/profile', (req, res, next) => {
  User.findById({
    _id: ""
  })
  .populate({
    path: 'favorite',
    populate: {
      path: 'myCar'
    }
  })
  .then((foundUser) => {
    res.json(foundUser)
  })
  .cathc((err) => {
    console.log(err)
  })
})

module.exports = router;
