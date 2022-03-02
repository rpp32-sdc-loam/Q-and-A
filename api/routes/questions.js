const express = require('express');
const Question = require('../models/Question');
const QuestionEntry = require('../models/QuestionEntry');
// const { getQuestions,
//   createQuestion,
//   updateQuestionHelpfulness,
//   reportQuestion
// } = require('../controllers/Questions');

const router = express.Router()

//db.questions.find({ product_id: 10 }).explain( "executionStats" );
router.get('/qa/questions', async (req, res, next) => {
  try {
    const questions = await Question.find({ product_id: req.query.product_id });
    if (!questions || questions.length === 0){
      let err = new Error('The product id was not found');
      throw err;
    }
    res.status(200).json(questions[0]);
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message});
  }
});

router.post('/qa/questions', async (req, res, next) => {
  try {
    const newQuestion = await QuestionEntry.create({ question_body: req.body.body, asker_name: req.body.name });
    const questionList = await Question.findOneAndUpdate(
      { product_id: req.body.product_id },
      { $push: { results: newQuestion } }
    );
    if(questionList === null) {
      const newEntry = await Question.create({product_id: req.body.product_id, results: [newQuestion]});
    }
    res.status(201).json({ success: true, msg: 'Answer has been added'});
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
});

router.put('/qa/questions/:question_id/helpful', async (req, res, next) => {
  try {
    const questionUpdate = await Question.updateOne(
      { 'results.question_id': req.params.question_id },
      { $inc: { 'results.$.question_helpfulness': 1 } }
    );
    if (questionUpdate.matchedCount === 0) {
      let err = new Error('Please include a valid question id');
      throw err;
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message});
  }
});


router.put('/qa/questions/:question_id/report', async (req, res, next) => {
  try {
    const questionUpdate = await Question.updateOne(
      { 'results.question_id': req.params.question_id },
      { $set: { 'results.$.reported': true } }
    )
    if (questionUpdate.matchedCount === 0) {
      let err = new Error('Please include a valid question id');
      throw err;
    }
    res.status(200).json({ success: true });
  } catch(err) {
    res.status(400).json({ success: false, msg: err.message });
  }
})



module.exports = router;