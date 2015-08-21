'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config');

var mongoose = require('mongoose');
var logger = require('./app/util/logger');

var db = mongoose.connection;

db.on('connecting', function () {
    logger.info('MongoDB: Conectando...');
});

db.on('error', function (error) {
    logger.error('Error na conexão MongoDB: ' + error);
    mongoose.disconnect();
});
db.on('connected', function () {
    logger.info('MongoDB: conectado!');
});
db.once('open', function () {
    logger.info('MongoDB: conexão aberta!');
});
db.on('reconnected', function () {
    logger.info('MongoDB: reconectado!');
});
db.on('disconnected', function () {
    logger.error('MongoDB desconectado!');
});

mongoose.connect(config.db.url, config.db.options);

var express = require('./config/express');
var server = express();

var port = 3000;

server.listen(port);

console.log('Server running at http://localhost:' + port + '/');
logger.info('Server started');

