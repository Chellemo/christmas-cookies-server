require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');
const bodyParser = require('body-parser')

var user = require('./controllers/usercontroller');
var cookie = require('./controllers/cookiecontroller');

sequelize.sync();

app.use(bodyParser.json())
app.use(require('./middleware/headers') )
app.use("/users", user);
app.use("/cookies", cookie);

app.listen(process.env.PORT), function(){
    console.log('App is listening on 3005')
   });