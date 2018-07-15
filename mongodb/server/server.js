const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const{Todo} = require('./models/todo');
const{User} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

//middleWare
app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    },(error) => {
        res.status(400).send(error);
        console.log('unable to save \n ' + error);
    });
});

app.get('/todos', (req,res)=>{
    Todo.find().then((todos) => {
        res.send({todos})
    },(error) => {
        res.status(400).send(e);
    });
});

// GET /todos/request
app.get('/todos/:id', (req,res) => {
    let id = req.params.id;    

    if(!ObjectID.isValid(id)){
        return res.status(404).send('Invalid ID format');
    }

    Todo.findById(id).then((todos) => {
        if(!todos){
            return res.status(404).send('no results');
        }

        res.send({todos});

    }).catch((error) => {
        res.status(400).send(error);
    });
});


app.listen(port,() => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};