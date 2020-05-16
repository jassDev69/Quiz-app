const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3002

const db = require('./database/database')

// body parser (will allow to post the data in body for api's)
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cors())

//------------------------ADMIN---------------------------

app.get('/', function (req, res) {
    res.send('hello welcome')
  })
// api to get all the questions
app.get('/api/admin/questions',db.getAllQuestion);

// api to delete questions
app.delete('/api/admin/questions/:id',db.deleteQuestion);

// api to get all users
app.get('/api/admin/allUsers',db.getAllUsers);

// api to delete user
app.delete('/api/admin/user/:id',db.deleteUser);

//------------------------USER---------------------------

// api to create user using signup
app.post('/api/user/signup',db.createSignup);

// api to get all the questions
app.get('/api/user/questions',db.getAllUserQuestion);

// api to login user
app.post('/api/user/login',db.loginUser);

// api to login user
app.post('/api/user/postQuestion',db.postQuestion);


app.listen(PORT, () => console.log(`Hosted on server : ${PORT}`))