const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // request to body me store krlega
const PORT = process.env.PORT || 3000;

//Middleware function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();//move to next line
}

app.use(logRequest);  

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/',localAuthMiddleware ,function (req, res) {
  res.send('Welcome to my hotel... How i an help you?, we have list of menus')
})


//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

//use the routers
app.use('/person', localAuthMiddleware ,personRoutes);
app.use('/menu', menuRoutes);


app.listen(PORT, () => {
    console.log('listening on port 3000')
}) 