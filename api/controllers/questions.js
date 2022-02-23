const Question = require('../models/Question');
const QuestionEntry = require('../models/QuestionEntry');
// const pool = require('../../config/dbs/postgres');

// @desc    Get all questions for a product
//@route    GET /qa/questions
exports.getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find({ product_id: req.query.product_id });
    res.status(200).json(questions[0]);
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message })
  }
}

// @desc    Add question for a product
//@route    POST /qa/questions
exports.createQuestion = async (req, res, next) => {
  try {
    const newQuestion = await QuestionEntry.create({ question_body: req.body.body, asker_name: req.body.name });
    const questionList = await Question.findOneAndUpdate(
      { product_id: req.body.product_id },
      { $push: { results: newQuestion } }
    );
    if(questionList === null) {
      const newEntry = await Question.create({product_id: req.body.product_id, results: [newQuestion]});
    }
    res.status(201).json({ success: true});
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Update helpfulness of question
//@route    PUT /qa/questions/:question_id/helpful
exports.updateQuestionHelpfulness = async (req, res, next) => {
  try {
    await Question.findOneAndUpdate(
      { 'results.question_id': req.params.question_id },
      { $inc: { 'results.$.question_helpfulness': 1 } }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
}

// @desc    Report a question
//@route    PUT /qa/questions/:question_id/report
exports.reportQuestion = async (req, res, next) => {
  try {
    await Question.findOneAndUpdate(
      { 'results.question_id': req.params.question_id },
      { $set: { 'results.$.reported': true } }
    )
    res.status(200).json({ success: true });
  } catch {
    res.status(400).json({ success: false, msg: err.message });
  }
}