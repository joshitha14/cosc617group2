var mysql = require('mysql');
var express = require('express');
var app = express();
const session = require('express-session');
var url = require('url');
const { Console } = require('console');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var cors = require('cors')// Needed when app and db are both running on same host.
const fileUpload = require('express-fileupload');//Used for the photo upload.
const cookieParser = require('cookie-parser');
const path = require('path');
/*cookieparser helps to sign the 'session id' with 'secret string' we pass, 
that way we can get hold of new session signed coookie and set this cookie in response 
using 'res.cookie' after user login. Next time when user tries to access any other routes 
to this domain we can get the signed cookie using 'req.signedCookies', 
maybe unsign this cookie and get 'session id' back and validate with session id in sssion store, 
also get any other information recorder in this session id
*/


//*****************************Use Middlewares *****************************
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


//******************************Socket.io Chat********************************
const http = require('http').createServer(app)
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    // allowedHeaders: [],
    credentials: true
  }
});

//On the sever side, .on listens for and catches messages from clients,
//and .emit sends the caught messages to all of the clients on the socket.
//The io variable represents the group of sockets. 
//The socket variable is for communicating with each individual connection.
//socket.emit will send the message back to the sender only.
//io.emit will send the message to all the client including sender.
//The first paramater in socket.on takes a string (currently 'message') which 
//can be any string defined by the user, but it must match the string in the 
//first paramater of the emit message on the client side. This is how
//.on knows what to listen for. The second paramater in .emit is the message that is
//sent, and the second paramater in .on is a variable that will hold the message received. 
io.on('connection', socket => {

  //Join the user to the private room.
  socket.on('joinRoom', room => {
    socket.join(room);
  });

  //Listen for messages and then emit back to clients.
  socket.on('message', ({ name, message, room }) => {
    io.to(room).emit('message', { name, message })
  })
});


//*********************************Signup**********************************
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


//********************************User Photo Upload********************************
app.use(fileUpload({
  createParentPath: true //Allows cretion of new directory/path does not exist. 
}));

//Post the photo to the local directory:
app.post('/upload', (req, res) => {

  var qs = ((url.parse(req.url, true))).query; //Get the query string from the request.

  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`../public/pubImages/${qs.Username}/${qs.FileName}`, err => {

    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/pubImages/pubImages/${qs.Username}/${qs.FileName}` });
    console.log(file);
  });
});


//Get filename of most recent photo:
app.get('/mostRecentPhoto', function (req, res) {
   
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  });

  var qs = ((url.parse(req.url, true))).query; //Get the query string from the request.

  con.connect(function(err) {
    if (err) throw err;

      con.query("SELECT * FROM photos WHERE Username=? ORDER BY PhotoID DESC LIMIT 1", [qs.Username], function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
  });
});

//Post new photo filename to database: 
app.post('/newPhotoName', function(req,res){
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  });

  try {
      const userName = req.body.Username;
      const photoID = req.body.PhotoID;
      console.log(req.body); //For testing only.
      console.log(userName + " " + photoID); //For testing only.
        con.query("INSERT INTO photos SET ?",{Username: userName, PhotoID: photoID} , function (err, result) {
          if (err) throw err.message;  
        });
    }
    catch(error) {
         console.log(error.message);
    }
});


//******************************Log in****************************************
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
//******************************Log out***************************************
app.post('/logout', function(req,res){
  req.session.destroy(function(err){
       if(err){
            res.status(403).json({message:'Error: User Session not removed'});
       }      
       res.clearCookie('sid', {path: '/'});
       res.status(200).json({message:'User Session removed'});
  })
});


//************************Create And Destroy Matches**************************
app.post('/matches', function(req,res){
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  });

  try {
      const liker = req.body.Liker;
      const likee = req.body.Likee;
      con.query("SELECT * FROM matches WHERE (Liker=? and Likee=?) or (Liker=? and Likee=?)",
      [liker, likee, likee, liker], function (err, result) {
        if (err) throw err.message;
        //If there is no existing record, create a new record. 
        else if (result.length <= 0){
          con.query("INSERT INTO matches SET ?",{Liker: liker, Likee: likee, Reciprocated: 0}, function (err, result) {
            if (err) throw err.message;
            res.status(200).json({status:200, message:'Potential match created.'});
          });

        }
        //If the user who clicked the like button is the likee in the existing record (meaning the other user
        //liked them first), and the reciprocated bit is currently 0, set the "Reciprocated" bit to 1 and a match is made.
        else if (liker === result[0].Likee && !result[0].Reciprocated) {
          con.query("UPDATE matches SET Reciprocated=1 WHERE Liker=? and Likee=?",[result[0].Liker, result[0].Likee], function (err, result) {
            if (err) throw err.message;
            res.status(200).json({status:200, message:'Potential match created.'});
          });
        }
        //If the reciprocated bit is set to 1, meaning that a match currently exists, and either user taps
        //the like button, nothing will happen. 
        else {
          res.status(200).json({status:200, message:'Match already exists. No action taken.'});
        }
     });
    }
    catch(error) {
         console.log(error.message);
    }
});

//Destroy existing match:
app.post('/destroyMatch', function(req,res){
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  });

  try {
      const liker = req.body.Liker;
      const likee = req.body.Likee;
      con.query("SELECT * FROM matches WHERE (Liker=? and Likee=?) or (Liker=? and Likee=?)",
      [liker, likee, likee, liker], function (err, result) {
        if (err) throw err.message;
        //If there is no existing record, do nothing. 
        else if (result.length <= 0){
            res.status(404).json({status:404, message:'No match exists.'})
        }
        //If there is an existing record, delete it.
        else {
          con.query("DELETE FROM matches WHERE (Liker=? and Likee=?) or (Liker=? and Likee=?)",[liker, likee, likee, liker], function (err, result) {
            if (err) throw err.message;
            res.status(200).json({status:200, message:'Match destroyed.'});
          });
        }
     });
    }
    catch(error) {
         console.log(error.message);
    }
});

//Get data from user_details table for matches only:
app.get('/getMatchDetails', function (req, res) {
   
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  });
  
  var qs = ((url.parse(req.url, true))).query; //Get the query string from the request.
  var query =   "SELECT * " +
                "FROM user_details AS U " +
                "WHERE U.Username IN ((SELECT Likee AS Username " +  
                                      "FROM matches " +
                                      "WHERE Liker=? AND Reciprocated=1) " +
                                      "UNION " +
                                      "(SELECT Liker AS Username " +
                                      "FROM matches " +
                                      "WHERE Likee=? AND Reciprocated=1))"

  con.connect(function(err) {
    if (err) throw err;
    con.query(query, [qs.Username, qs.Username], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});


//**********************************Get Requests********************************************
//NOTE: Some of these get requests were written early in the development process and 
//may not have been used. (Ian)

//Get data from user table for one or all users. 
app.get('/users', function (req, res) {

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  });

  var qs = ((url.parse(req.url, true))).query; //Get the query string from the request.

  con.connect(function(err) {
    if (err) throw err;
 
    if(qs.Username) {//Get user data for specified username.
      con.query("SELECT * FROM users WHERE Username=?", [qs.Username], function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    }
    else { //Get user data for all users.
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
  
  var qs = ((url.parse(req.url, true))).query; //Get the query string from the request.

  con.connect(function(err) {
    if (err) throw err;
 
    if(qs.Username) {//Get user data for specified username.
      con.query("SELECT * FROM user_details WHERE Username=?", [qs.Username], function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
    }
    else { //Get user data for all users.
      con.query("SELECT * FROM user_details", function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
    }
  });
});

//Get data from user_details table for all except on uesr.
//Used for the Meet page.  
app.get('/meetUsers', function (req, res) {
   
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  });
  
  var qs = ((url.parse(req.url, true))).query; //Get the query string from the request.

  con.connect(function(err) {
    if (err) throw err;

      con.query("SELECT * FROM user_details WHERE Username!=?", [qs.Username], function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
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

  var qs = ((url.parse(req.url, true))).query; //Get the query string from the request.

  con.connect(function(err) {
    if (err) throw err;
    if(qs.Username) {//Get user data for specified username.
      con.query("SELECT * FROM photos WHERE Username=? ORDER BY PhotoID ASC", [qs.Username], function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
    }
    else { //Get user data for all users.
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


  var qs = ((url.parse(req.url, true))).query; //Get the query string from the request.

  con.connect(function(err) {
    if (err) throw err;
 
    if(qs.Username) {//Get user data for specified user name.
      con.query("SELECT * FROM matches WHERE Liker=?", [qs.Liker], function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
    }
    else { //Get user data for all users.
      con.query("SELECT * FROM matches", function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
    }
  });
});

//****************************Create User Profile*********************************

//Post Profile data to user_details table:
app.post('/user_details', function(req,res){
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggydate"
  });

  try {
      const {Username, First_name, Birthdate, Sex, Weight, Breed, Zip_code, Bio, Age_min_pref, Age_max_pref, Sex_pref, Weight_min_pref, Weight_max_pref, Breed_pref, Dist_pref} = req.body;
      if(!Username){
        res.status(400).send({message:'Username missing'});
        }
        con.query("SELECT * FROM user_details WHERE Username =?",[Username], function (err, result) {
          if (err) throw err.message;

          else if (result.length > 0)
          {
              con.query("UPDATE user_details SET ? WHERE Username =?",[{First_name: First_name, Birthdate: Birthdate, Sex: Sex, Weight: Weight, Breed: Breed, Zip_code: Zip_code, Bio: Bio, Age_min_pref: Age_min_pref, Age_max_pref: Age_max_pref, Sex_pref: Sex_pref, Weight_min_pref: Weight_min_pref, Weight_max_pref: Weight_max_pref, Breed_pref: Breed_pref, Dist_pref: Dist_pref} ,Username], function (err, result) {
                if (err) throw err.message;
                res.status(200).json({status:200, message:'Profile updated successful'});
              });      
          }
       });
    }
    catch(error) {
         console.log(error.message);
    }
});


//***************************Listen for Connections***************************************

const PORT = process.env.PORT || '3001'
//Socket.io requires the connection to be an http connection. 
http.listen(PORT, function() {
  console.log('listening on port 3001')
})