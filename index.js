const express = require('express');

const app = express();

const port = 8002;

//y r we using path?  it is used to find the path, eg at line 19 , app.set('views......,path.join(__dirname),'views) here path is used
// basically check at last of this fille the explanation of path use..


const path = require('path');
//?


const db = require('./config/mongoose.js');

const AllTask=  require('./models/ToDoList.js')
//below c..is added by me
// const fs = require('fs');

app.set('view engine', 'ejs');
//?
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded());
app.use(express.static('Assets'));
//i have added below code from stack over flow
// app.engine('html', require('ejs').renderFile);


app.get('/', function(req, res) {
    AllTask.find({}, function(err, tasks) {
        if (err) {
            console.log("Error in fetching Tasks");
        }
        // console.log(tasks);
        res.render('index', {
            title: 'TODOList',
            tasks: tasks
        });
    });

});

// jb ye add-task pe click krega browser me to ,vo ejs file me form action ka name hmne yhi diya hai ,so app.post me 
// add-task call hoga to fn call bhi hoga 
// usme ye hmare  schema me AllTask jo defined hai vo ek list hai vhi db me bhi saved hai to ye ,us AllTask me ek new object create hoga
// jo ki .....
// fir hr ek bar jb ye object create hoga ek fn call hoga jo iska error check krega agr hai to error show ni to list me add to ho hi gya hai 
// ab ye browser page pe return ho jaega aor updated data ejs by default browser pe show kreag jo k hmara new added task hai

// res.redirect([status,] path)
// Redirects to the URL derived from the specified path, with specified status, a positive integer that corresponds to an HTTP status code . If not specified, status defaults to “302 “Found”
//res.redirect('back') will take user to the previous page on browser 
//res.redirect(304, 'back') it will do the same thing aand also a send a msg 304
// Redirects can be a fully-qualified URL for redirecting to a different site:
// res.redirect('http://google.com')
// A back redirection redirects the request back to the referer, defaulting to / when the referer is missing.

// res.redirect('back')



app.post('/add-task', function(req, res) {
    AllTask.create({
        task: req.body.task,
        date: req.body.date,
        category: req.body.category
    }, function(err, newTask) {
        if (err) {
            console.log('Error in creating a task');
            return;
        }
        return res.redirect('back');
    });
});

app.get('/delete-task', function(req, res) {
    console.log(req.query);
    var id = req.query;

    // to check the number of tasks to be deleted
    var count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {
        //Deleting the task from the database by using their individual ids
        AllTask.findByIdAndDelete(Object.keys(id)[i], function(err) {
            if (err) {
                console.log("Error in deleting the task from DB");
            }
        });
        console.log("Task-Deleted");
    }
    return res.redirect('back');
});



// app.get('/', function(req, res){

//     AllTask.find({name :'1.Gym'}, function(err, todos){
//         if (err) {
//             console.log('Error in fetching contacts from db')
//             return    
//         }

//         return res.render('index.html');
//     })});






app.listen(port, function(err){
    if (err) {
        console.log(err,"Error found!")
    }

    console.log("Server is running on port" ,port)
    
})



//why we use const path  = require('path')

// var express = require('express');
// var app = express();
// var PORT = 3000;

// var app = express()
// var blog = express()
// var blogAdmin = express()

// app.use('/user', blog)
// blog.use('/admin', blogAdmin)

// console.dir(app.path()) // ''
// console.dir(blog.path()) // '/blog'
// console.dir(blogAdmin.path()) // '/blog/admin'

// Output:

//   ''
//   '/user'      
//   '/user/admin'

//we can see that it prints the current path of the variable ,say app = express() and app is in root directory ,it printed ''
//when user.use('/user', blog ) when user path is called go to blog ,ouput = '/user' bcz path is user , when path is /admin .
// in short dir(variablename.path() tells you in which path this file is saved)