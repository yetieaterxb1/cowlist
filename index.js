const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json())

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'GrantS',
  database: 'cowDB',
  multipleStatements: true
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log('DB connection succeeded')
  } else {
    console.log('DB connection failed error: ' + JSON.stringify(err));
  }
});
app.listen(3000,()=>console.log('Express server is running at port 3000'));

//get all cows
app.get('/cows', (req, res)=> {
  mysqlConnection.query('SELECT * FROM cows', (err, rows, fields) => {
    if(!err) {
      console.log(rows);
      res.send(rows)
    } else {
      console.log(err);
    }
  })
})

//get cow by name
app.get('/cows/:name', (req, res)=> {
  mysqlConnection.query('SELECT * FROM cows WHERE name = ?', [req.params.name], (err, rows, fields) => {
    if(!err) {
      console.log(rows);
      res.send(rows)
    } else {
      console.log(err);
    }
  })
})


app.delete('/cows/:name', (req, res)=> {
  mysqlConnection.query('DELETE FROM cows WHERE name = ?', [req.params.name], (err, rows, fields) => {
    if(!err) {
      console.log(rows);
      res.send('Deleted successfully');
    } else {
      console.log(err);
    }
  })
})

app.post('/cows', (req, res)=> {
  let cow = req.body;
  var sql = "SET @cowID = ?; SET @name = ?; SET @description = ?; CALL new_cow(@cowID, @name, @description);";
  mysqlConnection.query(sql,[cow.cowID, cow.name, cow.description], (err, rows, fields) => {
    if(!err) {
      console.log(rows);
      res.send(rows);
    } else {
      console.log(err);
    }
  })
})
