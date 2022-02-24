const request = require('supertest');
const app = require('../server');
const router = require('../api/routes/questions');
// const { getQuestions,
//   createQuestion,
//   updateQuestionHelpfulness,
//   reportQuestion
// } = require('../api/controllers/questions');

describe('GET Questions', () => {
  test('get questions route exists', async () => {
    expect.assertions(1);
    const data = await router.get('/qa/questions')
    expect(data).toBeDefined();
  });

  test('should return correct doc format', () => {
    return request(app).get('/qa/questions').query({
      product_id: 2
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          product_id: expect.any(Number),
          results: expect.arrayContaining([
            expect.objectContaining({
            _id: expect.any(String),
            question_id: expect.any(Number),
            question_body: expect.any(String),
            question_date: expect.any(String),
            asker_name: expect.any(String),
            question_helpfulness: expect.any(Number),
            reported: expect.any(Boolean)
            })
          ])
        })
      );
    });
  });

  test('should return 400 if id doesn\'t exist', () => {
    return request(app).get('/qa/questions').query({
      product_id: 233333334
    })
    .expect(400);
  });

  test('should return 400 if id is missing', () => {
    return request(app).get('/qa/questions')
    .expect(400);
  });
});

describe('POST Question', () => {
  test('create a question route exists', async () => {
    expect.assertions(1);
    const data = await router.post('/qa/questions')
    expect(data).toBeDefined();
  });

  test('it should return 201 if post is successful', () => {
    return request(app).post('/qa/questions').send({
      product_id: 64620,
      body: "How big is it?",
      name: "bonnie",
      email: "obonnie@gmail.com"
    })
    .expect(201);
  });

  xtest('it should return 400 if product_id is missing', () => {
    return request(app).post('/qa/questions').send({
      body: "How big is it?",
      name: "bonnie",
      email: "obonnie@gmail.com"
    })
    .expect(400);
  });

  test('it should return 400 if body is missing', () => {
     return request(app).post('/qa/questions').send({
      product_id: 64620,
      name: "bonnie",
      email: "obonnie@gmail.com"
    })
    .expect(400);
  });

  test('it should return 400 if name is missing', () => {
     return request(app).post('/qa/questions').send({
      product_id: 64620,
      body: "How big is it?",
      email: "obonnie@gmail.com"
    })
    .expect(400);
  });

  test('it should create a new Question doc if product_id is not found', () => {});
});

describe('Question helpfulness', () => {
  test('update question helpfulness route exists', async () => {
    expect.assertions(1);
    const data = await router.put('/qa/questions/:question_id/helpful')
    expect(data).toBeDefined();
  });

  test('should return 200 if updated successfully', () => {
    return request(app).put('/qa/questions/4/helpful')
    .expect(200);
  });

  test('should return 400 if the question id is invalid', () => {
    return request(app).put('/qa/questions/abc/helpful')
    .expect(400);
  });

  test('should return 404 if the question id is missing', () => {
    return request(app).put('/qa/questions//helpful')
    .expect(404);
  });

  xtest('should return 400 if the question id is not in the database', () => {
      return request(app).put('/qa/questions/3434343434/helpful')
    .expect(400);
  });
});


describe('Report a Question', () => {
  test('report a question route exists', async () => {
    expect.assertions(1);
    const data = await router.put('/qa/questions/:question_id/report')
    expect(data).toBeDefined();
  });

  test('should return 200 if reported successfully', () => {
    return request(app).put('/qa/questions/4/report')
    .expect(200);
  });

  test('should return 400 if the question id is invalid', () => {
    return request(app).put('/qa/questions/abc/report')
    .expect(400);
  });

  test('should return 404 if the question id is missing', () => {
    return request(app).put('/qa/questions//report')
    .expect(404);
  });

  test('should return 400 if the question id is not in the database', () => {
    return request(app).put('/qa/questions/2344444444/report')
    .expect(400);
  });
});


