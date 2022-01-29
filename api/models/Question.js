const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({

  product_id: {
    type: Number,
    required: [true, 'Please add a product id'],
    unique: true,
  },
  question_body: {
    type: String,
    required: [true, 'Please add a question'],
    unique: true,
  },
  asker_name: String,
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please use a valid email']
  },
  question_date: {
    type: Date,
    default: Date.now
  },
  question_helpfulness: Number,
  reported: {
    type: Boolean,
    default: false
  },
  answers: {}
})

module.exports = mongoose.model('Question', QuestionSchema);