const path = require('path');
const express = require('express');

const {port} = require('../config/env');
const publicPath = path.join(__dirname,'../public'); // redirect path to specific folder, instead or go through one by one
let app = express();

// to start up the html page
app.use(express.static(publicPath));

/******** Port listening *********/
app.listen(port,() => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};