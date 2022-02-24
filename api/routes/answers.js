const express = require('express');
const Answer = require('../models/Answer');
const AnswerEntry = require('../models/AnswerEntry');
// const { getAnswers,
//   createAnswer,
//   updateAnswerHelpfulness,
//   reportAnswer
// } = require('../controllers/answers');

const router = express.Router()

router.get('/qa/questions/:question_id/answers', async (req, res, next) => {
  try {
    const answers = await Answer.find({ question: req.params.question_id });
    if (answers.length === 0){
      let err = new Error('The question id was not found');
      throw err;
    }
    res.status(200).json(answers[0]);
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message })
  }
});

router.post('/qa/questions/:question_id/answers', async (req, res, next) => {
  try {
    const newAnswer = await AnswerEntry.create({ body: req.body.body, answerer_name: req.body.name });
    await Answer.findOneAndUpdate({ question: req.params.question_id },
      { $push: { results: newAnswer } }
    );
    res.status(201).json({ success: true, msg: 'Answer has been added'});
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
});

router.put('/qa/answers/:answer_id/helpful', async (req, res, next) => {
  try {
    const id = parseInt(req.params.answer_id);
    const answerUpdate = await Answer.findOneAndUpdate(
      { 'results.answer_id': id },
      { $inc: { 'results.$.helpfulness': 1 } }
    );
    if (answerUpdate === null) {
      let err = new Error('Please include a valid answer id');
      throw err;
    }
    res.status(200).json({ success: true, msg: `updated answer ${req.params.answer_id} helpfulness` });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
});

router.put('/qa/answers/:answer_id/report', async (req, res, next) => {
  try {
    const id = parseInt(req.params.answer_id);
    const answerUpdate = await Answer.findOneAndUpdate(
      { 'results.answer_id': id },
      { $set: { 'results.$.reported': true } }
    );
     if (answerUpdate === null) {
      let err = new Error('Please include a valid answer id');
      throw err;
    }
    res.status(200).json({ success: true, msg: `reported answer ${req.params.answer_id}` });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
});

module.exports = router;