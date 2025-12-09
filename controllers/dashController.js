const express = require('express');
const router = express.Router();
const taskModel = require('../models/Task');



const home = (req, res) => {
    res.render('index');
}
const sample = (req, res) => {
    res.render('sample');
}
const blogPage = (req, res) => {
    res.render('blog');
}

const taskCreate = (req, res) => {
  res.render('create', { msg: null }); 
}

const createPage = async (req, res) => {
 const { title, description } = req.body;
    try {
         const taskData = new taskModel({title,description    
});
await taskData.save();
    res.render('create', { msg: "Task Created Successfully" });             
    }catch (error) {
        console.error("somthing went wrong in Task Create", error);   
 }
};
module.exports = {
    home,
    sample,
    blogPage,
    taskCreate,
    createPage

};