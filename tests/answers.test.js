const request = require('supertest');
const app = require('../server');
const router = require('../api/routes/answers');

describe('GET Answers', () => {
  test('get answers route exists', async () => {
    expect.assertions(1);
    const data = await router.get('/qa/questions/:question_id/answers');
    expect(data).toBeDefined();
  });

  test('should return a correct doc format', () => {
    return request(app).get('/qa/questions/10/answers')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          question: 10,
          count: 5,
          page: 1,
          results: expect.any(Array)
        })
      );
    });
  });

  test('should return 200 if id doesn\'t exist', () => {
     return request(app).get('/qa/questions/23333333/answers')
      .expect(200)
  });

  test('should return 404 if id is missing', () => {
     return request(app).get('/qa/questions//answers')
      .expect(404)
  });
});

describe('POST Answer', () => {
  test('create an route exists', async () => {
    expect.assertions(1);
    const data = await router.post('/qa/questions/:question_id/answers');
    expect(data).toBeDefined();
  });
  test('it should return 200 if post is successful', () => {
    return request(app).post('/qa/questions/5/answers').send({
      body: "I don't recommend it",
      name: "bonnie",
      email: "obonnie@gmail.com"
    })
    .expect(201);
  });

  test('it should return 404 if question_id is missing', () => {
      return request(app).post('/qa/questions//answers').send({
      body: "I don't recommend it",
      name: "bonnie",
      email: "obonnie@gmail.com"
    })
    .expect(404);
  });

  test('it should return 400 if body is missing', () => {
      return request(app).post('/qa/questions/5/answers').send({
      name: "bonnie",
      email: "obonnie@gmail.com"
    })
    .expect(400);
  });

  test('it should return 400 if name is missing', () => {
      return request(app).post('/qa/questions/5/answers').send({
      body: "I don't recommend it",
      email: "obonnie@gmail.com"
    })
    .expect(400);
  });

  test('it should create a new Answer doc if product_id is not found', () => {});

});

describe('update Answer helpfulness', () => {
  test('update answer helpfulness route exists', async () => {
    expect.assertions(1);
    const data = await router.put('/qa/answers/:answer_id/helpful');
    expect(data).toBeDefined();
  });
  test('should return 200 if updated successfully', () => {
    return request(app).put('/qa/answers/3/helpful')
    .expect(200);
  });

  xtest('should return 400 if the answer id is invalid', () => {
     return request(app).put('/qa/answers/abc/helpful')
    .expect(400);
  });

  test('should return 404 if the answer id is missing', () => {
    return request(app).put('/qa/answers//helpful')
    .expect(404)
  });

  xtest('should return 200 if the answer id is not in the database', () => {
    return request(app).put('/qa/answers/233334344/helpful')
    .expect(200)
  });
});

describe('Report Answer', () => {
  test('report an answer route exists', async () => {
    expect.assertions(1);
    const data = await router.put('/qa/answers/:answer_id/report');
    expect(data).toBeDefined();
  });
  test('should return 200 if reported successfully', () => {
    return request(app).put('/qa/answers/3/report')
    .expect(200);
  });

  xtest('should return 404 if the answer id is invalid', () => {
    return request(app).put('/qa/answers/abc/report')
    .expect(404);
  });

  test('should return 404 if the answer id is missing', () => {
      return request(app).put('/qa/answers//report')
    .expect(404);
  });

  xtest('should return 200 if the answer id is not in the database', () => {
      return request(app).put('/qa/answers/23333343/report')
    .expect(200);
  });
});