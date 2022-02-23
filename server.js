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

//mount routers
app.use(questions);
app.use(answers);

app.get('/', (req, res) => {
  res.send('This is the backend')
})

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

//Handle promise rejection
process.on('UnhandledPromiseRejection', (err, promise) => {
  console.log(`Unhandled rejection: ${err.message}`.red);
  //Close server
  server.close(() => process.exit(1));
});