const Question = require('../models/Question');
const pool = require('../../config/dbs/postgres');

// @desc    Get all questions for a product
//@route    GET /qa/questions
exports.getQuestions = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({ success: true, msg: `get questions for product# ${req.body.product_id}` });
}

// @desc    Add question for a product
//@route    POST /qa/questions
exports.createQuestion = async (req, res, next) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (error) {
    console.log(error.message);
  }
};

// @desc    Update helpfulness of question
//@route    PUT /qa/questions/:question_id/helpful
exports.updateQuestionHelpfulness = (req, res, next) => {
  res.status(200).json({ success: true, msg: `updated answer ${req.params.question_id} helpfulness` });
}

// @desc    Report a question
//@route    PUT /qa/questions/:question_id/report
exports.reportQuestion = (req, res, next) => {
  res.status(200).json({ success: true, msg: `answer ${req.params.question_id} reported` });
}