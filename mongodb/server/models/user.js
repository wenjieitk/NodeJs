const mongoose = require('mongoose');
const validator = require('validator');

let User = mongoose.model('User',{
    email:{
        type: String,
        require: true, // cannot be empty
        minlength: 1, // min length
        trim:true, // remove white space
        unique: true,
        validate:{
            validator : validator.isEmail,
            message: `{VALUE} is not a valid email`
        } 
    },

    password: {
        type: String,
        require: true,
        minlength: 6
    },
    
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

module.exports={User};