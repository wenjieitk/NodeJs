const {ObjectID} = require('mongodb');

const {mongoose} = require('./../mongodb/server/db/mongoose');
const {Todo} = require('./../mongodb/server/models/todo');

let id = '5b483e01ba3687594615082';

if(!ObjectID.isValid(id)){
    console.log('ID not valid');
}

// array format
Todo.find({
    _id: id
}).then((todos) => {
    console.log('find \n', todos);
});

// object format
Todo.findOne({
    _id: id
}).then((todos) => {
    console.log('\nfindOne \n', todos);
});

Todo.findById(id).then((todos) => {
    if(!todos){
        return console.log('ID not found');
        
    }
    console.log('\nfindById \n', todos);
});