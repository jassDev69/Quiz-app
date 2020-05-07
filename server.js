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

// api to get all the tracks
app.get('/api/tracks',db.getAllTracks);

// api to delete tracks
app.delete('/api/tracks/:id',db.deleteTrack);

//api to insert data in track table
app.post('/api/tracks/',db.insertToFav);


app.listen(PORT, () => console.log(`Hosted on server : ${PORT}`))