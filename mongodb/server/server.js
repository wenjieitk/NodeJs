const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo',{
    text:{
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt:{
        type: Number
    }
});


let newTodo = new Todo({
    text: 'cook dinner'
});

newTodo.save().then((doc)=>{
    console.log('saved todo',doc);
},(error) =>{
    console.log('unable to save \n ' + error);
});