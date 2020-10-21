var mysql = require('mysql');
var express = require('express');
var app = express();
var url = require('url');
const { Console } = require('console');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Get data from user table for one or all users. 
app.get('/users', function (req, res) {
   
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  });

  var qs = ((url.parse(req.url, true))).query;  //get the query string from the request

  con.connect(function(err) {
    if (err) throw err;
 
    if(qs.Username) {//send user data for specified user name
      con.query("SELECT * FROM users WHERE Username=?", [qs.Username], function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
    }
    else { //Send user data for all users
      con.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
    }
  });
});

//Get data from user_login table for one or all users. 
app.get('/user_login', function (req, res) {
   
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  });

  var qs = ((url.parse(req.url, true))).query;  //get the query string from the request

  con.connect(function(err) {
    if (err) throw err;
 
    if(qs.Username) {//send user data for specified user name
      con.query("SELECT * FROM user_login WHERE Username=?", [qs.Username], function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
    }
    else { //Send user data for all users
      con.query("SELECT * FROM user_login", function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
    }
  });
});

//Get data from photos table for one or all users. 
app.get('/photos', function (req, res) {
   
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  });

  var qs = ((url.parse(req.url, true))).query;  //get the query string from the request

  con.connect(function(err) {
    if (err) throw err;
 
    if(qs.Username) {//send user data for specified user name
      con.query("SELECT * FROM photos WHERE Username=?", [qs.Username], function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
    }
    else { //Send user data for all users
      con.query("SELECT * FROM photos", function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
    }
  });
});

//Get data from matches table for one or all users. 
app.get('/matches', function (req, res) {
   
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  });

  var qs = ((url.parse(req.url, true))).query;  //get the query string from the request

  con.connect(function(err) {
    if (err) throw err;
 
    if(qs.Username) {//send user data for specified user name
      con.query("SELECT * FROM matches WHERE Liker=?", [qs.Liker], function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
    }
    else { //Send user data for all users
      con.query("SELECT * FROM matches", function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
    }
  });
});

var server = app.listen(3306, function () {
  console.log('Server is running..');
});