const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

router.post('/user', userController.createUser);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

router.post('/post', postController.createPost);
router.get('/post/:id', postController.getPostById);
router.put('/post/:id', postController.updatePost);
router.delete('/post/:id', postController.deletePost);

router.post('/comment', commentController.createComment);
router.get('/comment/:id', commentController.getCommentById);
router.put('/comment/:id', commentController.updateComment);
router.delete('/comment/:id', commentController.deleteComment);


module.exports = router;
