const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'budgets',
  password: 'password',
  port: 5432,
})

const getUserByEmail = (email) => {  
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (error) {
              reject(new Error(error));
            } else {
              resolve(results.rows[0]);
            }
          })
      });
  }

module.exports = {
    getUserByEmail
}