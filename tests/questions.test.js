const router = require('../api/routes/questions');
const { getQuestions,
  createQuestion,
  updateQuestionHelpfulness,
  reportQuestion
} = require('../api/controllers/questions');


test('get questions route exists', async () => {
  expect.assertions(1);
  const data = await router.route('/qa/questions')
    .get(getQuestions);
  expect(data).toBeDefined();
});

test('create a question route exists', async () => {
  expect.assertions(1);
  const data = await router.route('/qa/questions')
    .post(createQuestion);
  expect(data).toBeDefined();
});

test('update question helpfulness route exists', async () => {
  expect.assertions(1);
  const data = await router.route('/qa/questions/:question_id/helpful')
    .put(updateQuestionHelpfulness);
  expect(data).toBeDefined();
});

test('update question helpfulness route exists', async () => {
  expect.assertions(1);
  const data = await router.route('/qa/questions/:question_id/reported')
    .put(reportQuestion);
  expect(data).toBeDefined();
});