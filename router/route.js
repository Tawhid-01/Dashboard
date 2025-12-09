const express = require('express');
const { home,sample,blogPage, taskCreate,createPage } = require('../controllers/dashController');
const router = express.Router();

// Example route
router.get("/", home)

router.get("/sample", sample)
router.get("/blog", blogPage)
router.get("/task/create", taskCreate)
router.post("/task/create/new", createPage)



module.exports = router;