// const express = require('express');
// const { home,sample,blogPage, taskCreate,createPage,deleteTask, viewTask,editTaskPage,updateTaskPage } = require('../controllers/dashController');
// const upload = require('../middleware/imgMiddleware');
// const router = express.Router();
// const userController = require('../controllers/userController');
// const taskController = require('../controllers/taskController');
// const auth = require('../middleware/authMiddleware');
// const checkPermission = require('../middleware/authMiddleware');

// // Example route
// router.get("/", home)

// router.get("/sample", sample)
// router.get("/blog", blogPage)
// // Profile: Needs 'view_profile' permission
// router.get('/profile', auth, checkPermission('view_profile'), userController.getProfile);
// // Create Task: Needs 'create_task' permission
// router.post('/task/create', auth, checkPermission('create_task'), upload.single('image'), taskController.createTask);
// router.post("/task/create/new", upload.single("image"), createPage)
// router.get("/task/delete/:id", deleteTask)
// router.get("/task/view/:id", viewTask)
// router.get("/task/edit/:id", editTaskPage)
// router.post("/task/update/:id", upload.single("image"), updateTaskPage)



// module.exports = router;
// src/router/route.js
const express = require('express');
const router = express.Router();

// Import Controllers
const { 
    blogPage, createPage, deleteTask, updateTaskPage, 
    viewTask, editTaskPage 
} = require('../controllers/dashController');
const userController = require('../controllers/userController');

// Import Middlewares
const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');
const upload = require('../middleware/imgMiddleware');

// --- PUBLIC ROUTES ---
router.get("/blog", blogPage);
router.get("/task/view/:id", viewTask);

// --- PROTECTED ROUTES (Requires Login) ---
router.get('/profile', auth, userController.getProfile); // Now this works!
router.post('/task/create', auth, upload.single('image'), createPage);

// --- VENDOR & ADMIN ROUTES ---
router.get("/task/edit/:id", auth, checkRole('vendor'), editTaskPage);
router.post("/task/update/:id", auth, checkRole('vendor'), upload.single("image"), updateTaskPage);

// --- ADMIN ONLY ROUTES ---
router.delete("/task/delete/:id", auth, checkRole('admin'), deleteTask);

router.get("/admin/customers", auth, checkRole('admin'), (req, res) => {
    res.json({ message: "List of all customers fetched" });
});

router.get("/admin/vendors", auth, checkRole('admin'), (req, res) => {
    res.json({ message: "List of all vendors fetched" });
});

module.exports = router;