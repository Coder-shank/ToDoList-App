const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String

    },
    

})
// const todoSchema = new mongoose.Schema({
//         type: String,
//         required: true
//     })



//define name of collection of our schema in db

const AllTask = mongoose.model('AllTask', todoSchema);

module.exports = AllTask;



