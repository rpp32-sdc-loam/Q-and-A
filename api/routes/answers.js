const express = require('express');
const Answer = require('../models/Answer');
const AnswerEntry = require('../models/AnswerEntry');
// const Redis = require('ioredis');
// const redis = new Redis({
//     host: 'ec2-34-207-41-48.compute-1.amazonaws.com',
//     port: 6379,
//     password: process.env.REDIS_AUTH
//   });

const router = express.Router()
router.get('/qa/questions/:question_id/answers', async (req, res, next) => {
  const id = req.query.question_id;
  const page = req.query.page || 0;
  const count = req.query.count || 5;
  const key = 'a' + id;
  let cache;

  try {
    // redis.get(key).then (res => cache = res)
    // .catch(err => console.log(error));

    // if (cache) {
    //   res.status(200).send( JSON.parse(cache))
    // } else {
    const data = await Answer.find({ question: id });
    if (data.length === 0){
      res.status(200).json({ question: id, page: page, count: count, results: []});
    } else{
      let answers = data[0];
      let start = page * count;
      let end = start + parseInt(count);
      answers.results = data[0].results.slice(start, end);
      answers.count = count;
      answers.page = page;

      // redis.set(key, JSON.stringify(answers));
      res.status(200).json(answers);
    }
  // }
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
    const answerUpdate = await Answer.updateOne(
      { 'results.answer_id': id },
      { $inc: { 'results.$.helpfulness': 1 } }
    );
    res.status(200).json({ success: true, msg: `updated answer ${req.params.answer_id} helpfulness` });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
});

router.put('/qa/answers/:answer_id/report', async (req, res, next) => {
  try {
    const id = parseInt(req.params.answer_id);
    const answerUpdate = await Answer.updateOne(
      { 'results.answer_id': id },
      { $set: { 'results.$.reported': true } }
    );
    res.status(200).json({ success: true, msg: `reported answer ${req.params.answer_id}` });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
});

module.exports = router;