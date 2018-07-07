const express = require('express');

const port = process.env.PORT || 3000;

let app = express();

// Json return
app.get('/',(request,response) => {
    response.send({
        name: 'jie',
        position: 'cto'
    });
});

// Html
app.get('/about', (req,res) => {
    res.send('<h1>hello about<h1>');
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to handle error'
    });
});

//middleware
//.static = take the absolute path of directory
//__dirname store the path of the script file excluding the parent folder -> "/Users/wenjie/Documents/GIt/nodejs_1/node-web-server"
//{url}/help.html
app.use(express.static(__dirname + '/public'));

app.listen(port,() => {
    console.log(`server is up on port ${port}`);
});