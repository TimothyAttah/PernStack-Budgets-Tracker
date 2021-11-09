const userRouter = require('express').Router();
const userAuth = require('../middleware/auth');
const userController = require('../controllers/userController');

userRouter.get('/:id/user', userAuth, userController.getUser)
userRouter.put('/follow', userAuth, userController.followUser)
userRouter.put('/unfollow', userAuth, userController.unfollowUser)
// userRouter.put('/:id/follow', userController.followUser)
// userRouter.put('/:id/unfollow', userController.unfollowUser)
userRouter.get('/friends/:userId', userController.getFriends)

module.exports = userRouter;
