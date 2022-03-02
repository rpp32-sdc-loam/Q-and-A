const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  question: {
    type: Number,
    required: true,
    unique: true
  },
  page: {
    type: Number,
    default: 1
  },
  count: {
    type: Number,
    default: 5
  },
  results: []
});

module.exports = mongoose.model('Answer', answerSchema);