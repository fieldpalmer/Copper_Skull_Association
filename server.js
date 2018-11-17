require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const express = require('express');
const session = require("express-session");
const passport = require("./config/passport");
const db = require('./models');

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8088;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require('./routes/user-api-routes')(app);
require('./routes/tech-api-routes')(app);
require('./routes/order-api-routes')(app);
require('./routes/certs-api-routes')(app);
require('./routes/review-api-routes')(app);
require('./routes/vehicle-api-routes')(app);
require('./routes/stripe-api-routes')(app);
require('./routes/oil-api-routes')(app);
require('./routes/quote-api-routes')(app);

let syncOptions = { force: false };

if (env === 'test' || env === 'development') {
  // syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    );
  });
});

module.exports = app;