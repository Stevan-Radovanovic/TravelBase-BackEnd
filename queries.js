const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'master2',
  password: 'newPassword',
  port: 5432,
});
