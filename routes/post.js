const express = require('express');
const postController = require('../controllers/post');
const router = express.Router();

router.post("/", postController.save);
router.get("/", postController.index);
router.get("/:id", postController.display);
router.patch("/:id", postController.update);
router.delete("/:id", postController.destroy);
module.exports = router;