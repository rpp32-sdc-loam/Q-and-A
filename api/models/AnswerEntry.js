const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const answerEntrySchema = new Schema({
  answer_id: Number,
  body: {
    type: String,
    required: [true, 'Please add an answer']
  },
  date: {
    type: String,
    default: new Date().toISOString()
  },
  answerer_name: {
    type: String,
    required: [true, 'Please add a name']
  },
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

module.exports = mongoose.model('AnswerEntry', answerEntrySchema);