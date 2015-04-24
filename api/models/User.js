/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = function(mongoose) {
  var schema = new mongoose.Schema({
      /*
       **	USERS
       */
      "username": {
        type: String,
        required: true,
        index: { unique: true },
      },
      "name": {
        type: String,
        required: true,
      },
      "firstname": {
        type: String,
        required: true
      },
      "password": {
        type: String,
        required: true,
      },
      "adress": {
        "street": {
          type: String,
          required: false,
        },
        'town': {
          type: String,
          required: false,
        },
        "country": {
          type: String,
          required: false,
        },
      },
      "email": {
        type: String,
        required: true,
      },
      "admin": {
        type: Boolean,
        default: false,
      },
      "activ": {
        type: Boolean,
        default: true,
      },
      "authentificated": {
        type: Boolean,
        default: true,
      }
    }
  );
  return mongoose.model('users', schema);
};
