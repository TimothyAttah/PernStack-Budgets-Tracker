const postRouter = require('express').Router();
const postAuth = require('../middleware/auth');
const postController = require('../controllers/postController');
const uploadController = require('../controllers/uploadController');

postRouter.post('/create', postAuth, postController.createPost);
postRouter.get('/', postController.allPosts);
postRouter.get('/users/post', postAuth, postController.myPosts);
postRouter.post('/upload', uploadController.createUpload);
postRouter.put('/:id/like', postController.likePost);
postRouter.delete(
	'/:postId/delete',
	postAuth,
	postController.deletePost
);
postRouter.put(
	'/comments/:id/delete',
	postAuth,
	postController.deletePostComments
);
postRouter.put('/:id/comments/create', postAuth, postController.createPostComment);
postRouter.get('/:id/comments', postAuth, postController.allPostComment);

module.exports = postRouter;
