const express = require('express');

const port = process.env.PORT || 3000;

let app = express();

app.get('/', (req,res) => {
    res
        .status(200)
        .send('Hello World');
});


app.get('/user', (req,res) => {
    res
        .status(200)
        .send([{
            name: 'jie',
            age: 27
        },{
            name: 'ling',
            age: 28
        }]);
});


app.listen(port,() => {
    console.log(`server is up on port ${port}`);
});

module.exports.app = app;