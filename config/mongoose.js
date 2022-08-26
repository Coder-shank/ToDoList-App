//this directory is for mongoose

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/todolist_db");

//now mongoose is connected to mngodb
//lets acess it

const db = mongoose.connection;

db.on('error', console.error.bind(console,'error connecting to db'));

//up and running then print the message
//when 'open' event is triggered call the function once
db.once('open', function(){
    console.log("db is sucessfully connected to the database")
});



