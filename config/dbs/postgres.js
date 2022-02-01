const { Pool } = require('pg');

const pool = new Pool({
  user: 'bonnieowens',
  password: 'password',
  database: 'QandA',
  host: 'localhost',
  port: 5432
});

module.exports = pool;