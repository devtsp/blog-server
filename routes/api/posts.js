const express = require('express');
const router = express.Router();
const postsController = require('../../controllers/postsController');

router
	.route('/')
	.get(postsController.getAllPosts)
	.post(postsController.createPost)
	.put(postsController.updatePost)
	.delete(postsController.deletePost);

router.route('/:id').get(postsController.getSinglePost);

module.exports = router;
