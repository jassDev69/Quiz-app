const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Quiz',
  password: 'admin321',
  port: 5432,
});

// fetching question data from DB
const getAllQuestion = (request, response) => {
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
//Sign up user
const createSignup = (request, response) => {  
  const query = {
    text: 'INSERT INTO users(first_name, last_name, email_id, password)VALUES($1, $2, $3, $4)',
    values: [request.body.firstName,request.body.lastName?request.body.lastName:'',request.body.emailId,request.body.password],
  }
  pool.query(query, (error, results) => {
    if (error) {
      if(error.code == '23505'){
        response.status(400).json('User already exist')
      }
      response.end()
    }
    else{
      response.status(200).json('You have successfully signup')
      response.end()
    }
  })
}

// fetching users data from DB
const getAllUsers = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const loginUser = (request, response) => {

console.log(JSON.stringify(request.body))
  // pool.query('SELECT * FROM users WHERE email_id='+request.body.email, (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   response.status(200).json('Welcome')
  // })
}
// Deleting record from user table in DB
const deleteUser = (request, response) => {
  pool.query('DELETE FROM users WHERE id='+request.params.id, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json('User deleted')
  })
}

module.exports = {
  getAllQuestion,
  deleteQuestion,
  createSignup,
  loginUser,
  getAllUsers,
  deleteUser
}