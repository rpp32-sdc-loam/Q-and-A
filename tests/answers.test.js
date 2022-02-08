const router = require('../api/routes/answers');
const { getAnswers,
  createAnswer,
  updateAnswerHelpfulness,
  reportAnswer
} = require('../api/controllers/answers');

test('get answers route exists', async () => {
  expect.assertions(1);
  const data = await router.route('/qa/questions/:question_id/answers')
    .get(getAnswers);
  expect(data).toBeDefined();
});

test('create an route exists', async () => {
  expect.assertions(1);
  const data = await router.route('/qa/questions/:question_id/answers')
    .post(createAnswer);
  expect(data).toBeDefined();
});

test('update answer helpfulness route exists', async () => {
  expect.assertions(1);
  const data = await router.route('/qa/answers/:answer_id/helpful')
    .put(updateAnswerHelpfulness);
  expect(data).toBeDefined();
});

test('report an answer route exists', async () => {
  expect.assertions(1);
  const data = await router.route('/qa/answers/:answer_id/reported')
    .put(reportAnswer);
  expect(data).toBeDefined();
});