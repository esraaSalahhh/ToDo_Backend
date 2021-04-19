const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());

const indexRoute = require('./routes/index_route');
const userRoute = require('./routes/user_route');
const todoRoute = require('./routes/Todo_route');
const AdminRoute = require('./routes/AdminAllUser_route');


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todoDB', {useNewUrlParser: true,  useUnifiedTopology: true});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
userRoute(app)
indexRoute(app)
todoRoute(app)
AdminRoute(app)

app.use((err, req, res, next)=>{
    console.log(err.message);
    res.status(422).send({err: err.message})
  
  })


module.exports = app;