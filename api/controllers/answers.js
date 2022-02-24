const Answer = require('../models/Answer');
const AnswerEntry = require('../models/AnswerEntry');
const pool = require('../../config/dbs/postgres');

// @desc    Get all answers for a question
//@route    GET /qa/questions/:question_id/answers
exports.getAnswers = async (err, req, res, next) => {
  try {
    const answers = await Answer.find({ question: req.params.question_id });
    res.status(200).json(answers[0]);
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message })
  }
}

// @desc    Add an answer to a question
//@route    POST /qa/questions/:question_id/answers
exports.createAnswer = async (req, res, next) => {
  try {
    const newAnswer = await AnswerEntry.create({ body: req.body.body, answerer_name: req.body.name });
    await Answer.findOneAndUpdate({ question: req.params.question_id },
      { $push: { results: newAnswer } }
    );
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Update helpfulness of answer
//@route    PUT /qa/answers/:answer_id/helpful
exports.updateAnswerHelpfulness = async (req, res, next) => {
  try {
    const id = parseInt(req.params.answer_id);
    const answerUpdate = await Answer.findOneAndUpdate(
      { 'results.answer_id': id },
      { $inc: { 'results.$.helpfulness': 1 } }
    );
    if (answerUpdate === null) {
      res.status(400).json({ success: false, msg: 'Please include a valid answer id'});
    }
    res.status(200).json({ success: true, msg: `updated answer ${req.params.answer_id} helpfulness` });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
}

// @desc    Report an answer
//@route    PUT /qa/answers/:answer_id/report
exports.reportAnswer = async (req, res, next) => {
  try {
    const id = parseInt(req.params.answer_id);
    const answerUpdate = await Answer.findOneAndUpdate(
      { 'results.answer_id': id },
      { $set: { 'results.$.reported': true } }
    );
     if (answerUpdate === null) {
      res.status(400).json({ success: false, msg: 'Please include a valid answer id'});
    }
    res.status(200).json({ success: true, msg: `reported answer ${req.params.answer_id}` });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
}