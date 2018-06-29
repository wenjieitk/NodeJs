const express = require('express');

let app = express();

app.get('/',(request,response) => {
    response.send({
        name: 'jie',
        position: 'cto'
    });
});

app.get('/about', (req,res) => {
    res.send('<h1>hello about<h1>');
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to handle error'
    });
});

app.listen(3000);