require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors')
const mysql = require('mysql2')

const port = process.env.PORT || 3000;


app.use(cors())
app.use(express.json())




const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE

});

connection.addListener('error', (err) => {
  console.log(err);
});



app.get('/servicios', (req, res) => {            
  const query = 'SELECT * FROM datosabackend' 

  connection.query(query, function (error, results) 
  { if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error executing query');
  } else res.send(results)
})});


app.get('/especialidades', (req, res) => {            
  const query = 'SELECT * FROM servicios' 

  connection.query(query, function (error, results) 
  { if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error executing query');
  } else res.send(results)
})});




app.listen(port, () => {
  console.log(`Example app listening on port ${port} http://localhost:${port}`)
})



