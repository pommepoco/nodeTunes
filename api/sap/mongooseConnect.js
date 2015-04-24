/**
 * We load mongoose
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/nodeTunes');

/**
 * We check if the connection is ok
 * If so we will continue to load everything ...
 */
var db = mongoose.connection;

console.log('Try to connect to MongoDB via Mongoose ...');

db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', function callback() {

  console.log('Connected to MongoDB !');

});

/**
 * Let's make our Mongodb Schemas/Models
 */
module.exports = {

  User: require('../models/User')(mongoose),
  Music: require('../models/Music')(mongoose),
};
