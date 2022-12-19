require('dotenv').config()
const mongoose = require('mongoose')
const Durango = require('../models/Durango.model')

mongoose.connect(process.env.MONGODB_URI)
.then(x => {
    console.log('connected to db name', x.connections[0].name)
    return(
        Durango.create({
            optionString: 'durango_gray_white-stripes_silver-rims',
            MSRP: 70000,
            imageURL: 'https://res.cloudinary.com/dnduinmil/image/upload/v1671201961/durango_gray_white-stripes_silver-rims.jpg'
        })
    ) 

})
    

    .catch(err => console.log(err))