const Question = require('../models/Question');
const pool = require('../../config/dbs/postgres');

// @desc    Get all questions for a product
//@route    GET /qa/questions
exports.getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find({ product_id: req.query.product_id });
    res.status(200).json({ success: true, data: questions[0].answers });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message })
  }
}

// @desc    Add question for a product
//@route    POST /qa/questions
exports.createQuestion = async (req, res, next) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (error) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Update helpfulness of question
//@route    PUT /qa/questions/:question_id/helpful
exports.updateQuestionHelpfulness = async (req, res, next) => {
  try {
    const question = await Question.findOneAndUpdate(
      { question_id: req.params.question_id },
      { $inc: { question_helpfulness: 1 } }
    )
    res.status(200).json({ success: true, data: question });
  } catch {
    res.status(400).json({ success: false, msg: err.message });
  }
}

// @desc    Report a question
//@route    PUT /qa/questions/:question_id/report
exports.reportQuestion = async (req, res, next) => {
  try {
    const question = await Question.findOneAndUpdate(
      { question_id: req.params.question_id },
      { $set: { reported: true } }
    )
    res.status(200).json({ success: true, data: question });
  } catch {
    res.status(400).json({ success: false, msg: err.message });
  }
}