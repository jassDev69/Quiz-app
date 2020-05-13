const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 3002

const db = require('./database/database')

// body parser (will allow to post the data in body for api's)
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cors())

// api to get all the questions
app.get('/api/admin/tracks',db.getAllQuestion);

// api to delete question
app.delete('/api/admin/tracks/:id',db.deleteTrack);



app.listen(PORT, () => console.log(`Hosted on server : ${PORT}`))