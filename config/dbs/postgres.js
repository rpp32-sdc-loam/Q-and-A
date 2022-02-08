const { Pool } = require('pg');

const pool = new Pool({
  user: 'bonnieowens',
  password: 'password',
  database: 'sdc_data',
  host: 'localhost',
  port: 5432
});

module.exports = pool;