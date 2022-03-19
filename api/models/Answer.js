const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  question: {
    type: Number,
    required: true,
    unique: true
  },
  results: []
});

module.exports = mongoose.model('Answer', answerSchema);