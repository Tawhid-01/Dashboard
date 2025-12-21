const express = require('express');
const { home,sample,blogPage, taskCreate,createPage,deleteTask, viewTask,editTaskPage,updateTaskPage } = require('../controllers/dashController');
const upload = require('../middleware/imgMiddleware');
const router = express.Router();

// Example route
router.get("/", home)

router.get("/sample", sample)
router.get("/blog", blogPage)
router.get("/task/create", taskCreate)
router.post("/task/create/new", upload.single("image"), createPage)
router.get("/task/delete/:id", deleteTask)
router.get("/task/view/:id", viewTask)
router.get("/task/edit/:id", editTaskPage)
router.post("/task/update/:id", upload.single("image"), updateTaskPage)



module.exports = router;