const redis = require('redis');

const client = redis.createClient();

const cache = (req, res, next) => {
  client.get(req, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  })
}