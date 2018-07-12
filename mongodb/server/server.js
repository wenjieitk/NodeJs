const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const{Todo} = require('./models/todo');
const{User} = require('./models/user');

let app = express();

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


app.listen(3000,() => {
    console.log('started 3000');
});