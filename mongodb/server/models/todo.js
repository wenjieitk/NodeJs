const mongoose = require('mongoose');

let Todo = mongoose.model('Todo',{
    text:{
        type: String,
        require: true, // cannot be empty
        minlength: 1, // min length
        trim:true // remove white space
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    }
});

module.exports={Todo};