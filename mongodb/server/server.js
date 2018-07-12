const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

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


let newTodo = new Todo({
    completed: true
});

newTodo.save().then((doc)=>{
    console.log('saved todo',doc);
},(error) =>{
    console.log('unable to save \n ' + error);
});

let User = mongoose.model('User',{
    email:{
        type: String,
        require: true, // cannot be empty
        minlength: 1, // min length
        trim:true // remove white space
    }
});

let user = new User({
    email: "123@qq.com"
});

user.save().then((doc)=>{
    console.log('saved user',doc);
},(error) =>{
    console.log('user unable to save \n ' + error);
});