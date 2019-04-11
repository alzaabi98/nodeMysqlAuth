const express = require("express")
const app = new express()
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const sequelize = require("./config/database")
//setup body parser

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//routes
app.use('/', require('./routes/index.js'))
app.use('/users', require('./routes/users.js'))


// view engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));


app.set('view engine', 'handlebars');

// connect to mysql databse


// listern to the port
const port = process.env.Port || 5000
app.listen(port, () => console.log(` The server started at ${port}`))