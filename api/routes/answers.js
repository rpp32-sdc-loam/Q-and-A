const express = require('express');
const { getAnswers,
  createAnswer,
  updateAnswerHelpfulness,
  reportAnswer
} = require('../controllers/answers');

const router = express.Router()

router.route('/qa/questions/:question_id/answers')
  .get(getAnswers)
  .post(createAnswer)

router.route('/qa/answers/:answer_id/helpful')
  .put(updateAnswerHelpfulness)

router.route('/qa/answers/:answer_id/report')
  .put(reportAnswer)


module.exports = router;