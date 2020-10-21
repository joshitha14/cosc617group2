var express = require("express");
var app = express();
var mysql= require('mysql');

var db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "doggy_date"
})

app.get('/', (req,res)=>{
    var sqlInsert="INSERT INTO USER_LOGIN (Username,Password) VALUES ('david','david123');"
    db.query(sqlInsert, (err,result)=>{
        res.send ("Data Inserted !!");
    });

});


app.listen(3001, ()=>{
    console.log("Server is running and alive");
});
