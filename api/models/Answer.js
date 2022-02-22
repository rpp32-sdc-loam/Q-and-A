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

// answerSchema.pre('save', function (next) {
//   this.question_id = this.req.params.question_id;
//   //must include next or code will get stuck on this line
//   next();
//   //INSTEAD OF next() YOU CAN THROW AN ERROR TO STOP ACTION
//   // throw new Error('Save Failed');
// });

module.exports = mongoose.model('Answer', answerSchema);