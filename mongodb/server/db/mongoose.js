const mongoose = require('mongoose');

const {port} = require('./../config/env');

const mongoUri = (port === 3000) ? 'mongodb://localhost:27017/TodoApp' : 'mongodb://jiecavman:root123@ds137581.mlab.com:37581/node_1';

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, {useNewUrlParser: true });

module.exports = {
    mongoose
};