var mysql = require('mysql');
var express = require('express');
var app = express();
var url = require('url');
const { Console } = require('console');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var cors = require('cors')// Needed when app and db are both running on same host (npm install cors --save)
app.use(cors()) 

//Used for login:
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);//Used to create a session store in the DB I think.
//If you don't add a store to the DB then I think the session will save in the browser. I did not use the DB.
app.use(express.json());
app.use(express.urlencoded({extended:false})); // parse url encoded bodies (i.e html forms)
app.use(express.json()); // parse JSON bodies (req data are received as JSON objects)

//****************************************************************************
//Socket.io Chat
//****************************************************************************
const http = require('http').createServer(app)
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    // allowedHeaders: [],
    credentials: true
  }
});

io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
})


//****************************************************************************
//Log in
//****************************************************************************


app.use(session({
     name: 'sid',
     resave: false,
     saveUninitialized: false,
     secret: 'secretkey102020',
     cookie: {
          maxAge: 1000 * 60 * 60 * 2,
          sameSite: true,
          secure: false
          }
     }),
);


app.post('/login', function(req,res){

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  });

  try {
       const {userName, password} = req.body;
       if(!userName || !password){
            return res.status(400).render('login', {message:'Please provide an email and password'});
       }
       con.query('SELECT * FROM USERS WHERE Username = ? AND Password = ?', [userName, password], function(err, results) {

            if (results.length>0) {
                 req.session.curntUser = results[0].Username; 
                 res.status(200).redirect("/home");          
            }
            else {
                 return res.status(401).render('login', {message:'Email or Password is incorrect'});
            }
            
       });
  }
  catch(error) {
       console.log(error.message);
  }
});

//****************************************************************************
//Get Requests
//****************************************************************************


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

//Get data from user_details table for one or all users. 
app.get('/user_details', function (req, res) {
   
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
      con.query("SELECT * FROM user_details WHERE Username=?", [qs.Username], function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
    }
    else { //Send user data for all users
      con.query("SELECT * FROM user_details", function (err, result, fields) {
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

// var server = app.listen(3001, function () {
//   console.log('Server is running..');
// });

http.listen(3001, function() {
  console.log('listening on port 3001')
})