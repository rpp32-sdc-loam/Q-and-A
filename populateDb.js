const mongoose = require('mongoose');
const Question = require('./api/models/Question');
const AnswerEntry = require('./api/models/AnswerEntry');
const Answer = require('./api/models/Answer');

const getQuestionIds = async () => {
  try {
    let questions = await AnswerEntry.aggregate([
      { $group: { _id: '$question_id' } }
    ]);
    questions.forEach(function pushAnswer(doc) {
      db.answers.insertOne({ question: doc._id });
      console.log(doc._id);
    });
    // return questionIds;
  } catch (e) { console.log(e.message); }
}

// const populateDb = () => {
//   let questions = getQuestionIds();
//   questionIds.forEach(async function pushAnswer(doc) {
//     try {
//       await () => {
//         Answer.create({question: })
//       }
//     }
//   })
// }


//populate photos
db.photos_data.aggregate([
  { $group: { _id: '$answer_id', photos: { $push: { id: '$id', url: '$url' } } } }
], {
  allowDiskUse: true,
  cursor: {}
}
).forEach(function (doc) {
  db.photos.insertOne({ answer_id: doc._id, photos: doc.photos });
});
//

//populate answers
db.answerentries.aggregate([
  {
    $group: {
      _id: '$question_id',
      results: { $push: { answer_id: '$answer_id', body: '$body', date: '$date', answerer_name: '$answerer_name', helpfulness: '$helpfulness', photos: '$photos' } }
    }
  }
], {
  allowDiskUse: true,
  cursor: {}
}
).forEach(function (doc) {
  db.answers.insertOne({ question_id: doc._id, page: 1, count: 5, results: doc.results });
});
//

//populate questions
db.questions_data.aggregate([
  {
    $group: {
      _id: '$product_id',
      results: { $push: { question_id: '$question_id', question_body: '$question_body', question_date: '$question_date', asker_name: '$asker_name', question_helpfulness: '$question_helpfulness', reported: '$reported' } }
    }
  }
], {
  allowDiskUse: true,
  cursor: {}
}).forEach(function (doc) {
  db.questions1.insertOne({ product_id: doc._id, results: doc.results });
})
//


db.answerentries.updateOne({ answer_id: doc._id }, { $set: { photos: doc.photos } });

//count how many answers have photos
db.photos_data.aggregate([
  { $group: { _id: '$answer_id' } }, { $count: 'answer_ids' }
], {
  allowDiskUse: true,
  cursor: {}
}
);
//

//remove incomplete entries
db.answerentries.find({ answer_id: { $exists: false } }).forEach(function (doc) {
  db.answerentries.remove(doc);
});
//

//populate questions collection
db.answerentries.aggregate([
  { $group: { _id: '$question_id', $addFields: { $project: { _id: 0, 'id': '$answer_id', body: 1, date: 1, answerer_name: 1, helpfulness: 1, photos: 1 } } } }
])
//

//populate answers in questions_data
// db.answerentries.aggregate([
//   { $group: { _id: '$question_id' } },
//   { $project: { id: 1, body: 1, date: 1, answerer_name: 1, helpfulness: 1, photos: 1 } }
// ], {
//   allowDiskUse: true,
//   cursor: {}
// }
// ).forEach(function (doc) {
//   db.photos.insertOne({ answer_id: doc._id, photos: doc.photos });
// });

db.answerentries.aggregate([
  { $project: { _id: 0, question_id: 1, 'id': '$answer_id', body: 1, date: 1, answerer_name: 1, helpfulness: 1, photos: 1 } }
], {
  allowDiskUse: true,
  cursor: {}
}).forEach(function (doc) {
  let key = doc.id;
  let update = {};
  update['answers.' + key] = { id: doc.id, body: doc.body, date: doc.date, answerer_name: doc.answerer_name, helpfulness: doc.helpfulness, photos: doc.photos };
  db.questions_data.updateOne({ question_id: doc.question_id }, { '$set': update })
}).allowDiskUse();



db.answerentries.find({ answer_id: { $lt: '10000' } }).forEach(function (doc) {
  let key = 'answers.' + doc.answer_id;
  let value = { id: doc.answer_id, body: doc.body, date: doc.date, answerer_name: doc.answerer_name, helpfulness: doc.helpfulness, photos: doc.photos };
  db.questions_data.updateOne({ question_id: doc.question_id },
    { $set: { [key]: value } })
}).allowDiskUse();

//very slow method
db.answerentries.find().forEach(function (doc) {
  let key = doc.answer_id;
  let update = {};
  update['answers.' + key] = { id: doc.answer_id, body: doc.body, date: doc.date, answerer_name: doc.answerer_name, helpfulness: doc.helpfulness, photos: doc.photos };
  db.questions_data.updateOne({ question_id: doc.question_id }, { '$set': update })
}).allowDiskUse();

db.questions_data.find().forEach(function (doc) {
  let key = doc.answer_id;
  print(doc.answers[key]);
});

//reset answers to {}
db.questions_data2.updateMany({ answers: { "$gt": {} } }, {
  $set: { 'answers': {} }
});
//

//remove answers field
db.questions_data2.updateMany({ answers: { $exists: true } },
  { $unset: { answers: 1 } }, false, true
);
//

db.questions.updateMany({},
  { $unset: { _id: 1 } }, false, true
);

db.collection.updateMany({}, { $unset: { "passwrod": 1 } })
db.questions_data.updateMany({ : { $exists: true } }, { $unset: { 'answers[key]': 1 } });
module.exports = getQuestionIds;


db.answers.aggregate([
  { $unwind: '$results' },
  { $group: }
], {
  allowDiskUse: true,
  cursor: {}
}).pretty()

db.answers.find().forEach(function (doc) {
  doc.results.forEach(answer => {
    let key = answer.answer_id;
    let update = {};
    update['answers.' + key] = { id: answer.answer_id, body: answer.body, date: answer.date, answerer_name: answer.answerer_name, helpfulness: answer.helpfulness, photos: answer.photos };
    db.questions_data.find({ question_id: answer.question_id }).insertOne(update);
  })
})

db.answers.aggregate([
  {
    $project: {
      _id: 0, question_id: 1, answer: '$results.answer_id'
    }
  }
]).pretty();

db.answers.updateMany({}, { $set: { 'results.$.reported': false } });


db.answers.aggregate([
  {
    $project: {
      _id: 0, question_id: 1,
      answers:
      {
        $arrayToObject: {
          $map: {
            input: '$results',
            as: 'el',
            in: {
              k: { $toString: '$$el.answer_id' },
              v: '$$el'
            }
          }
        }
      }
    }
  },
  { $out: 'questions_test' }
]).pretty();


//copy collection
db.questions_data.aggregate([
  { $match: {} },
  { $out: 'questions_data2' }
])

//outer join
db.questions_data2.aggregate([
  { $match: { question_id: { $lt: 1000 } } },
  {
    $lookup: {
      from: 'questions_test',
      localField: 'question_id',
      foreignField: 'question_id',
      pipeline: [
        { $project: { _id: 0, question_id: 0 } }
      ],
      as: 'results'
    }
  },
  { $project: { question_id: 1, product_id: 1, question_body: 1, question_date: 1, asker_name: 1, question_helfulness: 1, reported: 1, results: { $arrayElemAt: ['$results', 0] } } },
  { $project: { _id: 0, question_id: 1, product_id: 1, question_body: 1, question_date: 1, asker_name: 1, question_helfulness: 1, reported: 1, answers: '$results.answers' } },
  { $out: 'questions_list' }
], {
  allowDiskUse: true
});



db.questions_test.aggregate([
  { $match: { question_id: { $lt: 10 } } },
  { $project: { _id: 0 } },
  {
    $lookup: {
      from: 'questions_data2',
      localField: 'question_id',
      foreignField: 'question_id',
      as: 'answers'
    }
  }
]).pretty();



//add answer field to every doc
db.questions_data2.updateMany({}, { $set: { 'answers': {} } },
  {
    upsert: false,
    multi: true
  })

db.questions_test.find().forEach(function (doc) {
  db.questions_data2.updateOne({ question_id: doc.question_id },
    { $set: { answers: doc.answers } })
})

db.sample.find().forEach(function (doc) {
  // let results = { $arrayElemAt: [ doc.results, 0 ] }
  $let results = '$results';
  print(results);
})

db.sample.aggregate([
  {
    $project: {
      answers: {
        $arrayToObject: {
          $map: {
            input: '$results.answers',
            as: 'el',
            in: {
              k: { $toString: '$$el.answer_id' },
              v: '$$el'
            }
          }
        }
      }
    }
  }
]).pretty()


db.sample.aggregate([
  { $project: { results: { $arrayElemAt: ['$results', 0] } } },

  { $project: { answers: '$results.answers' } }

]).pretty()
db.answers.updateMany({}, { $set: { 'results.$[].reported': false } });