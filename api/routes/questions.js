const express = require('express');
const { getQuestions,
  createQuestion,
  updateQuestionHelpfulness,
  reportQuestion
} = require('../controllers/Questions');

const router = express.Router()

router.route('/qa/questions')
  .get(getQuestions)
  .post(createQuestion)

router.route('/qa/questions/:question_id/helpful')
  .put(updateQuestionHelpfulness)

router.route('/qa/questions/:question_id/report')
  .put(reportQuestion)


module.exports = router;