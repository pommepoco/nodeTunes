/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var db = require('../sap/mongooseConnect');
var bcrypt = require('bcrypt');

module.exports = {

  index: function (req, res) {
    res.json(req.session.user);
  },

  create: function (req, res, next) {

    if (!req.param('password') || !req.param('email')) {
      res.json({error: 'missing argument'});
      return;
    }

    var passwordHash = bcrypt.hashSync(req.param('password'), 10);

    db.User.findOne({email: req.param('email')}, function (err, user) {
      if (err || !user) {	// ERROR OR WRONG EMAIL
        req.params.password = null;
        res.json({error: err});
        console.log(err);
      } else {
        var result = bcrypt.compareSync(req.param('password'), user.password, function (err, result) {
          console.log(err);
        });
        console.log('result', result);
        if (result) {	//	Good password
          user.authentificated = true;
          req.session.user = user;
          user.save(function (err) {	// apply authentificated to database
            if (err) {
              console.log(error);
            }
            else console.log('save apply');
          });
          res.json({user: req.session.user});
        } else {	// wrong password
          res.json({error: err});
        }
      }
    });
  },

  delete: function (req, res) {
    if (req.session.user && req.session.user._id)
      db.User.findOne({_id: req.session.user._id}, function (err, user) {
        if (err) return console.log(err);
        if (user) {
          user.authentificated = false;
          user.save(function (err) {
            if (err) console.log(err);
            else console.log('disconnect apply')
          });
        }
      });
    req.session.user = null;
    req.session.authentificated = false;
    res.json({connection: false});
  }
};
