const {ObjectID} = require('mongodb');

const {mongoose} = require('./../mongodb/server/db/mongoose');
const {Todo} = require('./../mongodb/server/models/todo');

// remove all todos
Todo.remove({}).then((result) => {
    console.log(result);
}); 

// find one and remove
Todo.findOneAndRemove({_id:'5b4b0d077d719a8bf0257e08'}).then((todo) => {
    console.log(todo);
});

// find id and remove
Todo.findByIdAndRemove('5b4b0d077d719a8bf0257e09').then((todo) => {
    console.log(todo);    
}); 