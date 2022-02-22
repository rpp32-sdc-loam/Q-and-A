const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  answer_id: {
    Number,
    unique: true
  }
  photos: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'PhotosData'
    }
  ]
})


db.photos.find().forEach(function (doc) {
  db.photos.remove({ photos: { $exists: false } });
});
module.exports = mongoose.model('Photo', photoSchema);