const db = require('../models');
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var path = require("path");

module.exports = function(app) {

  //takes object with email and password
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user.dataValues);
  });

  //do something after successful login
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    }
    else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  
  app.post('/api/register', function(req, res) {
    console.log(req);
    db.User.create(req.body).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      res.status(422).json(err.errors[0].message);
    });
  });

  app.get('/api/users', function(req, res) {
    db.User.findAll().then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get('/api/users/:id', function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [{model: db.Vehicle}]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  
  app.delete('/api/users/:id', function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.put('/api/users', function(req, res) {
    db.User.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbUser) {
        res.json(dbUser);
      });
  });

};