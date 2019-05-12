const express = require("express")
const app = new express()
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const session = require("express-session")
const flash = require("connect-flash")
const passport = require('passport')


//const sequelize = require("./config/database")
//setup body parser

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// configure flash 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

require('./config/passport')
// add passport 
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// add middlware for flash messages
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('successMessage')
    res.locals.errorMessage = req.flash('errorMessage')
    res.locals.error = req.flash('error');

    if(req.user) {
    	res.locals.user = req.user
    }
    next()
})

//routes
app.use('/', require('./routes/index.js'))
app.use('/users', require('./routes/users.js'))


// view engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// listern to the port
const port = process.env.Port || 5000
app.listen(port, () => console.log(` The server started at ${port}`))