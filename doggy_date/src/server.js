var mysql = require('mysql');
var express = require('express');
var app = express();
const session = require('express-session');
var url = require('url');
const { Console } = require('console');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var cors = require('cors')// Needed when app and db are both running on same host (npm install cors --save)
const cookieParser = require('cookie-parser');
/*cookieparser helps to sign the 'session id' with 'secret string' we pass, 
that way we can get hold of new session signed coookie and set this cookie in response 
using ' res.cookie' after user login. Next time when user tries to access any other routes 
to this domain we can get the signed cookie using 'req.signedCookies', 
maybe unsign this cookie and get 'session id' back and validate with session id in sssion store, 
also get any other information recorder in this session id
*/

// app.use(cors()) 

//****************************************************************************
// Use Middlewares 

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(cookieParser('secretkey102020'));

app.use(express.urlencoded({extended:false}));
// parse url encoded bodies (i.e html forms)

app.use(express.json());
// parse JSON bodies (req data are received as JSON objects)

//Express-session
app.use(session({
     name: 'sid',
     resave: false,
     saveUninitialized: false,
     secret: 'secretkey102020',
     cookie: {
          maxAge: 1000 * 60 * 60 * 2, // milliseconds * seconds * minutes * hours = 2 hours
          sameSite: true,
          secure: false,
          signed: true
          }
     }),
);

//****************************************************************************


//****************************************************************************
//Socket.io Chat
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


//****************************************************************************
//Signup
app.post('/register', function(req,res){
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  });

  try {
      const {userName, password, passwordConfirm} = req.body;
      if(!userName || !password || !passwordConfirm){
        res.status(400).send({message:'Please provide an email and password'});
        }
      con.query("SELECT * FROM users WHERE Username =?",[userName], function (err, result) {
        if (err) throw err.message;
        else if (result.length > 0){
          res.status(403).json({message:'Username is taken, try different Name'});
        }
        else if(password !== passwordConfirm){
          res.status(403).json({message:'Passwords do not match'});
        }
        else
        {
          con.query("INSERT INTO users SET ?",{Username: userName, Password:password} , function (err, result) {
            if (err) throw err.message;
            con.query("INSERT INTO user_details SET ?",{Username: userName}, function (err, result) {
              if (err) throw err.message;
              res.status(200).json({status:200, message:'Registration successful'});
            });      
        });
        }
     });
    }
    catch(error) {
         console.log(error.message);
    }
});

//****************************************************************************


//****************************************************************************
//Log in
app.post('/login', function(req,res){
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  }); 
  

  try {
       const {userName, password} = req.body;
       if(!userName || !password){
            return res.status(400).send({message:'Please provide an email and password'});
        }
       con.query('SELECT * FROM users WHERE Username = ? AND Password = ?', [userName, password], function(err, results) {
           if (err) throw err.message;
           if (results.length>0) {
            const userInfo = {'userName': results[0].Username};
            const expiresAt = new Date(Date.now() + req.session.cookie.maxAge);
            // calculate the expiresAt date-time from the 'maxAge' (number of milliseconds) we gave in session
            res.cookie('sid', req.sessionID, req.session.cookie);
            // send set cookie in response created based of session id 
            //(passing - cookie name, cookie value, coockie options defined in session) 
            res.json({
                message: 'Authentication successful',
                isAuth: true,
                expiresAt: expiresAt,
                userInfo: userInfo
            });
            // create and send a json object with minimum info needed to pass into client,
            //note that we are not saving cookie info in localstorage as its not secure
            //where login response in react fetch will grab this info, saves in localstorage 
            //and set the 'authState', for matches you can grab the userinfo from localstorage

            }
            else {
            // return res.status(401).render('login', {message:'Email or Password is incorrect'});
            res.status(403).json({message:'Email or Password is incorrect'});
            }            
       });
  }
  catch(error) {
       console.log(error.message);
  }

});
//****************************************************************************

//****************************************************************************
//Log out
app.post('/logout', function(req,res){
  req.session.destroy(function(err){
       if(err){
            res.status(403).json({message:'Error: User Session not removed'});
       }      
       res.clearCookie('sid', {path: '/'});
       res.status(200).json({message:'User Session removed'});
  })
});
//****************************************************************************



//****************************************************************************
//Get Requests

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
//****************************************************************************

//Socket.io requires the connection to be an http connection. 
http.listen(3001, function() {
  console.log('listening on port 3001')
})