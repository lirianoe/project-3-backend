require('dotenv').config()

const cors = require('cors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')


var usersRouter = require('./routes/users');
const carRouter = require('./routes/car')
const favoriteRouter = require('./routes/favorite')
const { isAuthenticated } = require('./middleware/jwt.middleware')

var app = express();

app.use(logger('dev'));

app.use(cors({
    origin: '*'
}))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', usersRouter);
app.use('/car', carRouter)
app.use('/favorite', isAuthenticated, favoriteRouter)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


module.exports = app;
