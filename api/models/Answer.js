const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  question_id: {
    type: Number,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    required: [true, 'Please add an answer'],
    unique: true,
  },
  answerer_name: String,
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please use a valid email']
  },
  photos: [String],
  date: {
    type: Date,
    default: Date.now
  },
  helpfulness: Number,
  reported: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Answer', AnswerSchema);