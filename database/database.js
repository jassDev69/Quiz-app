const Pool = require('pg').Pool

//local
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'Quiz',
//   password: 'admin321',
//   port: 5432,
// });

//hosted site
const pool = new Pool({
  user: 'atstepvrlpyghn',
  host: 'ec2-52-7-39-178.compute-1.amazonaws.com',
  database: 'd9lcr7cpsa39ph',
  password: '7ec57440334ed3205f54f9b6d7e67e5bc3ec4ae56cc0e5a89abb2a6d7e0c5dc0',
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
  pool.query('SELECT * FROM users WHERE email_id=$1',[request.body.emailId], (error, results) => {
        if(!results.rows.length){
              const query = {
                text: 'INSERT INTO users(first_name, last_name, email_id, password)VALUES($1, $2, $3, $4)',
                values: [request.body.firstName,request.body.lastName?request.body.lastName:'',request.body.emailId,request.body.password],
              }
              pool.query(query, (error, results) => {
                if (error) {
                  throw error
                }
                else{
                  response.status(200).json({status: 200, message: 'You have successfully signed up'});
                  response.end()
                }
              })
        }
        else{
                response.status(400).json({status: 400, message: 'Email Id already exist'});
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

  pool.query('SELECT * FROM users WHERE email_id=$1',[request.body.email], (error, results) => {
    if (error) {
      throw error
    }
    if(results.rows.length)
    response.status(200).json({status: 200, message: 'Welcome',data : results.rows})
    else
    response.status(200).json({status: 200, message: "User doesn't exist"})
  })
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
// fetching question data from DB
const getAllUserQuestion = (request, response) => {
  pool.query('SELECT id,question_text,options FROM question', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//Post question
const postQuestion = (request, response) => {  
      const query = {
        text: 'INSERT INTO question(question_text, options, correct_option)VALUES($1, $2, $3)',
        values: [request.body.question_text,request.body.options,request.body.correct_option],
      }
      console.log(query);

      pool.query(query, (error, results) => {
        console.log(results);
        if (error) {
          throw error
        }
        else{
          response.status(200).json({status: 200, message: 'Question Posted'});
          response.end()
        }
      })
}

module.exports = {
  getAllQuestion,
  deleteQuestion,
  createSignup,
  loginUser,
  getAllUsers,
  deleteUser,
  getAllUserQuestion,
  postQuestion
}