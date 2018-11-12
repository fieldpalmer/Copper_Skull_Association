require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const express = require('express');

const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

require('./routes/user-api-routes')(app);
require('./routes/tech-api-routes')(app);
require('./routes/order-api-routes')(app);
require('./routes/certs-api-routes')(app);
require('./routes/review-api-routes')(app);

let syncOptions = { force: false };

if (env === 'test' || env === 'development') {
  syncOptions.force = true;
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