const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photosDataSchema = new Schema({
  id: {
    type: Number,
    unique: true
  }
  answer_id: Number,
  url: String
})

module.exports = mongoose.model('Photos_data', photosDataSchema);