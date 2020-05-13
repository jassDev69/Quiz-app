const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Quiz',
  password: 'admin321',
  port: 5432,
});

// fetching question data from DB
const getAllQuestions = (request, response) => {
  pool.query('SELECT * FROM question', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Deleting record from question table in DB
const deleteQuestion = (request, response) => {
  pool.query('DELETE FROM question WHERE id='+request.params.id, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


module.exports = {
  getAllQuestions,
  deleteQuestion
}