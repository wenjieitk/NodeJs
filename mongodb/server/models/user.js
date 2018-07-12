const mongoose = require('mongoose');

let User = mongoose.model('User',{
    email:{
        type: String,
        require: true, // cannot be empty
        minlength: 1, // min length
        trim:true // remove white space
    }
});

module.exports={User};