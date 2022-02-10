const mongoose = require('mongoose');
const colors = require('colors');



const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/sc_data', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // console.log(conn.connection);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.log('Error connecting to Mongodb', error.message);
  }
}

module.exports = connectDB;