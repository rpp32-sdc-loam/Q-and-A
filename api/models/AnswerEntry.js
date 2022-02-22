const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const answerEntrySchema = new Schema({
  answer_id: Number,
  body: {
    type: String,
    required: [true, 'Please add an answer'],
    unique: true
  },
  date: {
    type: String,
    default: new Date().toISOString()
  },
  answerer_name: String,
  helpfulness: {
    type: Number,
    default: 0
  },
  reported: {
    type: Boolean,
    default: false
  },
  photos: []
})

answerEntrySchema.plugin(AutoIncrement, {
  inc_field: 'answer_id', start_seq:
    6879307
});

answerEntrySchema.virtual('answer').get(function () {
  return {
    answer_id: this.answer_id,
    body: this.body,
    answerer_name: this.answerer_name,
    date: this.date,
    helpfulness: this.helpfulness,
    photos: this.photos
  };
});

module.exports = mongoose.model('AnswerEntry', answerEntrySchema);