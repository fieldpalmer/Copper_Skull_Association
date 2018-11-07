    const express = require('express')
    const app = express()
    const passport = require('passport')
    const session = require('express-session')
    const bodyParser = require('body-parser')
    const env = require('dotenv').load()
    const exphbs = require('express-handlebars')

    //For BodyParser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

     // For Passport
    app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

     //For Handlebars
    app.set('views', './app/views')
    app.engine('hbs', exphbs({extname: '.hbs'}));
    app.set('view engine', '.hbs');

    app.get('/', (req, res) => {
	  res.send('Welcome to Passport with Sequelize');
	});

	//Models
    var models = require("./app/models");

    //Routes
    var authRoute = require('./app/routes/auth.js')(app,passport);

    //load passport strategies
    require('./app/config/passport/passport.js')(passport,models.user);

    //Sync Database
   	models.sequelize.sync().then( () => {
    console.log('Nice! Database looks fine')

    }).catch( (err) => {
    console.log(err,"Something went wrong with the Database Update!")
    });

    app.listen(5000, (err) => {
		if(!err)
		console.log("Site is live"); else console.log(err)
	});




    