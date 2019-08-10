require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');
const bodyParser = require('body-parser')

var user = require('./controllers/usercontroller');
var cookie = require('./controllers/cookiecontroller');

sequelize.sync(); // <-- {force:true} to delete database table data

app.use(bodyParser.json())
app.use(require('./middleware/headers') )
app.use("/users", user);
app.use("/cookies", cookie);

app.listen(process.env.PORT, function(){
    console.log('App is listening on PORT ')
   });