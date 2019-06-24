const mysql = require('mysql');
const express = require('express');

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'GrantS',
  database: 'cowDB'
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log('DB connection succeeded')
  } else {
    console.log('DB connection failed error: ' + JSON.stringify(err));
  }
});