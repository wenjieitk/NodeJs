const mongoose = require('mongoose');

const {env} = require('./../config/env');

const mongoUri = (env === 'test') ? 'mongodb://localhost:27017/TodoAppTest' 
                    :(env === 'development') ? 'mongodb://localhost:27017/TodoApp' 
                        : 'mongodb://jiecavman:root123@ds137581.mlab.com:37581/node_1';

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, {useNewUrlParser: true });

module.exports = {
    mongoose
};