const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const QuestionEntrySchema = new Schema({
  product_id: Number,
  question_id: {
    type: Number
  },
  question_body: {
    type: String,
    required: true,
    unique: true
  },
  asker_name: String,

  question_date: {
    type: String,
    default: new Date().toISOString()
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

QuestionEntrySchema.plugin(AutoIncrement, {
  inc_field: 'question_id', start_seq:
    3518964
});

module.exports = mongoose.model('QuestionEntry', QuestionEntrySchema);