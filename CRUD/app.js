const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./dbconn');
const routes = require('./routes/routes');
const verifyToken = require("./middleware/middleware");
var cookieParser = require('cookie-parser');
var cors = require('cors');
const path = require('path');

// create app 
const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')))
// allow external url 
app.use(cors({
    origin: "*"
}));

// cookieParser middleware
app.use(cookieParser());


// Parses the text as json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded('extended:false'));


//eja set up
app.set('view engine', 'ejs');
app.set('templates', 'templates');






app.get('/home', verifyToken, (req, res) => {
    // res.send("Home Page")
    res.render('../templates/index');
})


// use routes which is create in routes.js
app.use('/', routes);


const port = 3000;
app.listen(port, async (err) => {
    if (err) throw err;
    else console.log(`server running on port ${port}`)
})

module.exports = app