const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const ejsLayouts = require('express-ejs-layouts');  
const userRouter = require('./router/route');   
const path = require('path');

//database connection

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


//ejs integration
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set("layout", "layouts/home");

//static files
app.use(express.static('public'));

//routers
  app.use(userRouter);

//server setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});