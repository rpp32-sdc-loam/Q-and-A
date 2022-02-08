const Answer = require('../models/Answer');
const pool = require('../../config/dbs/postgres');

// @desc    Get all answers for a question
//@route    GET /qa/questions/:question_id/answers
exports.getAnswers = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get answers for question# ${req.params.question_id}` });
}

// @desc    Add an answer to a question
//@route    POST /qa/questions/:question_id/answers
exports.createAnswer = (req, res, next) => {
  // try {
  //   const bootcamp = await Bootcamp.create(req.body);
  //   res.status(201).json({ success: true, data: bootcamp });
  // } catch (error) {
  //   console.log(error.message);
  // }
  res.status(201).json({ success: true, msg: `Added answer for question# ${req.params.question_id}` });
};

// @desc    Update helpfulness of answer
//@route    PUT /qa/answers/:answer_id/helpful
exports.updateAnswerHelpfulness = (req, res, next) => {
  res.status(200).json({ success: true, msg: `updated answer ${req.params.answer_id} helpfulness` });
}

// @desc    Report an answer
//@route    PUT /qa/answers/:answer_id/report
exports.reportAnswer = (req, res, next) => {
  res.status(200).json({ success: true, msg: `answer ${req.params.answer_id} reported` });
}