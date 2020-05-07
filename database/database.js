const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'final-project-music-albums',
  password: 'admin321',
  port: 5432,
});

// fetching track data from DB
const getAllTracks = (request, response) => {
  pool.query('SELECT * FROM track', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Deleting record from track table in DB
const deleteTrack = (request, response) => {
  pool.query('DELETE FROM track WHERE id='+request.params.id, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
//first getting id from playlist table(by passing title name) then inserting into table track
const insertToFav = (request, response) => {  
  pool.query("SELECT id FROM playlist WHERE title='"+request.body.playlist_id+"'", (error, results) => {
  const query = {
    text: 'INSERT INTO track(id, playlist_id, title, uri, master_id,img_url)VALUES($1, $2, $3, $4, $5,$6)',
    values: [request.body.id, results.rows.length?results.rows[0].id :1,request.body.title,request.body.uri,request.body.master_id,request.body.img_url],
  }
  pool.query(query, (error, results) => {
    if (error) {
      if(error.code == '23505'){
        response.status(400).json('Already added to your favourites')
      }
      response.end()
    }
    else{
      response.status(200).json('Added to favourites')
      response.end()
    }
  })
  })
}



module.exports = {
    getAllTracks,
    deleteTrack,
    insertToFav
}