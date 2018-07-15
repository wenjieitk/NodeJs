const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://jiecavman:root123@ds137581.mlab.com:37581/node_1', {useNewUrlParser: true } 
                 || 'mongodb://localhost:27017/TodoApp', {useNewUrlParser: true } );

module.exports = {
    mongoose
};