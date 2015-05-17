/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var db = require('../sap/mongooseConnect');
var bcrypt = require('bcrypt');

module.exports = {

  delete: function (req, res, next) {
    db.User.findByIdAndRemove(req.param('id'), function (err) {
      if (err)
        console.log(err);
      else
        console.log({message: 'User removed from the Database!'});
    });
    console.log('delete' + req.param('id'));
    res.json({delete: req.param('id')});
  },

  edit: function (req, res, next) {
    if (req.session.user && req.session.user._id === req.params('id')) { // User is authaurise
      db.User.findOne({_id: req.params('id')}, function (err, user) {
        res.json();
      });
    } else {	// User not allow
      res.forbidden('You are not permitted to perform this action.');
    }
  },

  index: function (req, res, next) {
    db.User.find({'activ': true}, function (err, users) {
      res.json(users);
    });
  },

  adminView: function (req, res, next) {
    db.user.findOne({_id: req.params('id')}, function (err, user) {
      res.json(user);
    });
  },

  adminEdit: function (req, res, next) {
    db.User.findOne({_id: req.params('id')}, function (err, user) {
      user.isAdmin = req.params('isAdmin');
      user.email = req.params('email');
      user.activ = req.params('activ');
      user.save(function (err) {
        if (err) {
          console.log(err);
        }
      });
      res.json(user);
    });
  },

  create: function (req, res, next) {
    var bcrypt = require('bcrypt');
    var params = req.params.all();

    console.log("try to create user", params);
    params.password = bcrypt.hashSync(params.password, 10);
    params.confirm = null;
    user = db.User(params);
    user.save(function (err, data) {
      if (err) {
        req.params.password = null;
        req.params.confirm = null;
        res.json({error: err});
        console.log(err);
      } else {
        data.password = undefined;
        req.session.user = data;
        res.json({res: true, user: data});
        console.log('inscription', data);
      }
    });
  }

};

