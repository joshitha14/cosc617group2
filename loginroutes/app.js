const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
// const dotenv = require('dotenv');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
// parse url encoded bodies (i.e html forms)

app.use(express.json());
// parse JSON bodies (req data are received as JSON objects)


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



app.use('/', require('./routes/login'));


app.listen(3000, function() {
     console.log('http://localhost:3000/')
});