const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
  myCar: { type: Schema.Types.ObjectId, ref: 'Durango' },
  
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Favorites = mongoose.model('Favorites', favoritesSchema);

module.exports = Favorites;