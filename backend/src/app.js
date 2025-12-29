const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const ejsLayouts = require('express-ejs-layouts');  
const userRouter = require('./router/route');   
const path = require('path');
const connectDB = require('./config/db');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');


const app = express();

app.use(cors());
//data storage connection

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//database connection config
connectDB();

//ejs integration
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set("layout", "layouts/dashLayout");

//static files
app.use(express.static('public/uploads'));
// This explicitly maps the URL "/uploads" to your physical folder
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

  //use session
  app.use(session({
    secret: 'yourSecretKet123',
    resave: false,               
    saveUninitialized: false, 
    cookie: { maxAge: 2000 }     
  
}));
  //use flash 
  app.use(flash());
   //flash middleware
    app.use((req, res, next) => {
        res.locals.success = req.flash('success');
        res.locals.error = req.flash('error');
        next();
    }
);

//routers
  app.use(userRouter);
 
//server setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});