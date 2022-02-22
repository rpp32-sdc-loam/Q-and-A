const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  product_id: {
    type: Number,
    required: true
  },
  results: [
    {
      question_id: {
        type: Number,
        required: true,
        unique: true
      },
      question_body: {
        type: String,
        required: [true, 'Please add a question'],
        unique: true
      },
      asker_name: String,
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
    }
  ]
})

// QuestionSchema.plugin(AutoIncrement, {
//   inc_field: 'question_id', start_seq:
//     3518964
// });

module.exports = mongoose.model('Question', QuestionSchema);
