const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const durangoSchema = new Schema({
  optionString: {
    type: String,
    required: true
  },
  msrp: {
    type: Number,
    required: true
  },
imageURL: {
    type: String,
    required: true
}, 

  
});

const Durango = mongoose.model('Durango', durangoSchema);

module.exports = Durango;