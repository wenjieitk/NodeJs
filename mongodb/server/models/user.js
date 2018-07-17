const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
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


// to override the mongoose method -> convert value to Json before sent back
UserSchema.methods.toJSON = function() {
    let user = this;

    console.log( 'toJSON this\n' + this);
    /** this 
        { 
            _id: 5b4df8d90a3a4a49e5cb6195,
            email: 'wer1n123jie1@gefmaifl.codm',
            password: '123456',
            tokens:
            [ { _id: 5b4df8d90a3a4a49e5cb6196,
                access: 'auth',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjRkZjhkOTBhM2E0YTQ5ZTVjYjYxOTUiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTMxODM2NjMzfQ.hDvTsx2RPrkRBb21B7cGACDPdQLKjmIu76-iFFSkozQ' } ],
            __v: 1 
        }
     */
    
    let userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken = function() {
    let user = this;
    console.log( 'generateAuthToken this\n' + this);
    /** this
        { 
            _id: 5b4df8d90a3a4a49e5cb6195,
            email: 'wer1n123jie1@gefmaifl.codm',
            password: '123456',
            tokens: [],
            __v: 0 
        }
     */

    let access = 'auth';
    let token = jwt.sign({
        _id: user._id.toHexString(),
        access
    },'secretKey');

    user.tokens = user.tokens.concat([{
        access,
        token
    }]);

    return user.save().then(() => {
        return token;
    }).then((token) => {
        return token;
    });
};

let User = mongoose.model('User', UserSchema);

module.exports={User};