require('newrelic');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/dbs/mongoDB');

dotenv.config({ path: './config/config.env' });

//Connect to db
connectDB();

//load routes
const questions = require('./api/routes/questions');
const answers = require('./api/routes/answers');

const app = express();
app.use(express.json());
app.use(cors());

module.exports = app;

//mount routers
app.use(questions);
app.use(answers);

app.get('/', (req, res) => {
  res.send('This is the backend')
});

const PORT = 5000;

if (process.env.NODE_ENV !== 'test'){
  app.listen(PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);
}