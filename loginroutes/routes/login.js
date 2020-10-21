const express = require('express');
const router = express.Router();
const mysqlcon = require('../dbcon');


const redirectLogin = function(req, res, next) {
     if(!req.session.curntUser){
          res.redirect('/login')
     } else {
          next()
     }
}

const redirectHome = function(req, res, next) {
     if(req.session.curntUser){
          res.redirect('/home')
     } else {
          next()
     }
}


router.get('/',redirectHome, function(req,res){
     res.render('welcome');
});

router.get('/login',redirectHome, function(req,res){
     res.render('login', {message:'Please provide an email and password'});
});

router.get('/register',redirectHome, function(req,res){
     res.render('register',{message: false});
});

router.get('/home',redirectLogin, function(req,res){
     res.render('home');
});

router.get('/profile',redirectLogin, function(req,res){
     res.render('profile');
});

router.post('/login', function(req,res){

     try {
          const {userName, password} = req.body;
          if(!userName || !password){
               return res.status(400).render('login', {message:'Please provide an email and password'});
          }
          mysqlcon.query('SELECT * FROM USERS WHERE Username = ? AND Password = ?', [userName, password], function(err, results) {

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

router.post('/register',redirectHome, function(req,res){

     const {userName, password, passwordConfirm} = req.body;
     mysqlcon.query("SELECT * FROM USERS WHERE Username =?",[userName], function (err, result) {
          if(err) {
               console.log(err.message);
          }
          else if(result.length > 0){
               return res.render('register',{message: 'UserName is taken, please try different Name'});
          }
          else if(password !== passwordConfirm){
               return res.render('register',{message: 'Passwords do not match'});
          }
          mysqlcon.query("INSERT INTO USERS SET ?",{Username: userName, Password:password} , function (err, result) {
               if(err) {
                    console.log(err.message);
               }
               else {
                    return res.redirect("/login");
               }
             });
        });

});

router.post('/logout',redirectLogin, function(req,res){
     req.session.destroy(function(err){
          if(err){
               return res.redirect('/home')
          }
          res.clearCookie('sid')
          res.redirect('/login')
     })
});

module.exports = router;

