const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: {
    type: Number, default:
      3518964
  }
});

var counter = mongoose.model('counter', CounterSchema);

const QuestionSchema = new Schema({
  question_id: {
    type: Number
  },
  product_id: {
    type: Number,
    required: [true, 'Please add a product id']
  },
  question_body: {
    type: String,
    required: [true, 'Please add a question'],
    unique: true
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
  question_helpfulness: {
    type: Number,
    default: 0
  },
  reported: {
    type: Boolean,
    default: false
  },
  answers: {
    default: {}
  }
})

QuestionSchema.plugin(AutoIncrement, {
  inc_field: 'question_id', start_seq:
    3518964
});

module.exports = mongoose.model('Question', QuestionSchema);

