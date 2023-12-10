//Dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

//Imports the connection object
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Allows use of passport and serialize 
const passport = require('passport');
const serialize = require('./utils/serialize-deserialize');

//Sets up Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Incorporate the custom helper methods
const hbs = exphbs.create({helpers});

// Set up sessions with cookies
const sess = {
    secret: process.env.SESSION_SECRET,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 30,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(passport.initialize());
app.use(passport.session());
//serialize(passport);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//turn on routes
app.use(routes);


//Connects to the database before starting Express.js server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`Now listening at http://localhost:${PORT}`);
    })
});
