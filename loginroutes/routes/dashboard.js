const express = require('express');
const router = express.Router();
const mysqlcon = require('../dbcon');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


router.get('/dashboard', function(req,res){
     res.render('home');
});

router.get('/matches', function(req,res){
     res.render('matches');
});



module.exports = router;