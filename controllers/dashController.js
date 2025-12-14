const express = require('express');
const router = express.Router();
const taskModel = require('../models/Task');
const path = require('path');
const fs = require('fs');


    //dashPage
const home = (req, res) => {
    res.render('index');
}

     //samplw page
const sample = (req, res) => {
    res.render('sample');
}


        //blog page
const blogPage = async(req, res) => {
      try{
         //get data
     const allTastks =await taskModel.find();
  res.render('blog', {data: allTastks, msg: null }); 
   }catch (error) {
    console.error("somthing went wrong in Task Create Page", error);   
   }
}
 
        //create task page
const taskCreate =async (req, res) => {
  
  res.render('create',{ msg: null }); 
   
}
   

        //create task
const createPage = async (req, res) => {
 const { title, description } = req.body;
 const image = req.file ? req.file.filename : null;
    try {
         const taskData = new taskModel({title,description, image    
});
await taskData.save();
 //get data
  const allTastks = await taskModel.find();
    res.render('blog', { msg: "Task Created Successfully", data: allTastks });             
    }catch (error) {
        console.error("somthing went wrong in Task Create", error);   
 }
};
     

        //delete task
const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        await taskModel.findByIdAndDelete(taskId);
        //get data
        const allTastks = await taskModel.find();
        req.flash('success', 'Task Deleted Successfully');
        res.redirect('/blog'); 
    } catch (error) {
        req.flash('error', 'Error Deleting Task');
        res.redirect('/blog');
        console.error("somthing went wrong in Deleting Task", error);   
    }
};




        //view single task
const viewTask = async (req, res) => {
    try{
        const taskId = req.params.id;
        const taskDetail = await taskModel.findById(taskId);
        res.render('taskView', {data: taskDetail});
    }catch (error) {
        console.error("somthing went wrong in Viewing Task", error);   
    }
}
        //edit task page
const editTaskPage = async (req, res) => {
    try{
        const taskId = req.params.id;
        const taskDetail = await taskModel.findById(taskId);
        res.render('EditTask', {data: taskDetail, msg: null});
    }catch (error) {
        console.error("somthing went wrong in Editing Task Page", error);   
    }
}


     //update task
     const updateTaskPage = async (req, res) => {
        const taskId = req.params.id;
        if (!taskId) {
            return res.status(404).send("Task ID is missing or not found");
        }else{
            let taskData = await taskModel.findById(taskId);
            const old_image = taskData.image;
             const { title, description } = req.body;
             const image = req.file ? req.file.filename :old_image;
    try {
        taskData.title = title;
        taskData.description = description;
        if(image){
            taskData.image = image;
            const oldImagePath = path.join(__dirname, '../public/uploads/images', old_image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }else{
            taskData.image = old_image;
        }
await taskData.save();
 //get data
  const allTastks = await taskModel.find();
    res.render('blog', { msg: "Task Updated Successfully", data: allTastks });             
    }catch (error) {
        console.error("somthing went wrong in Task Updating", error);   
 }
};
        }

     
module.exports = {
    home,
    sample,
    blogPage,
    taskCreate,
    createPage,
    deleteTask,
    viewTask,
    editTaskPage,
    updateTaskPage

};