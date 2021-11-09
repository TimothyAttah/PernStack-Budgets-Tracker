const User = require('../model/UserModel');
const UserPosts = require('../model/PostModel');

const userControllers = {
	getUser: async (req: any, res: any) => {
		try {
			const user = await User.findOne({ _id: req.params.id }).select(
				'-password'
			);
			if (user) {
				await UserPosts.find({ postedBy: req.params.id })
					.populate('postedBy', '-password')
					.exec(async (err: any, posts: any) => {
						if (err) {
							return res.status(404).json({ error: err.message });
						}
						res.status(200).json({
							message: 'Single user profile',
							user,
							posts,
						});
					});
			}
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
	followUser: async (req: any, res: any) => {
		// if (req.body.userId !== req.params.id) {
		// 	try {
		// 		const user = await User.findById(req.params.id)
		// 		const currentUser = await User.findById(req.body.userId)
		// 		if (!user.followers.includes(req.body.userId)) {
		// 			await user.updateOne({$push: {followers: req.body.userId}})
		// 			await currentUser.updateOne({ $push: { followings: req.params.id } })
		// 			res.status(200).json('User has been followed ')
		// 		} else {
		// 				res.status(403).json({ error: "You already follow this user" });
		// 		}
		// 	} catch (err) {
		// 			res.status(500).json({ error: err.message });
		// 	}
		// } else {
		// 	res.status(403).json({error: 'You can\'t follow yourself'})
		// }

		try {
			User.findByIdAndUpdate(
				req.body.followId,
				{
					$push: { followers: req.user._id },
				},
				{ new: true },
				(err: any, result: any) => {
					if (err) {
						return res.status(404).json({ error: err.message });
					}
					User.findByIdAndUpdate(
						req.user._id,
						{
							$push: { followings: req.body.followId },
						},
						{ new: true }
					)
						.select('-password')
						.then((results: any) => {
							res.status(200).json({ message: 'You are following', results });
						});
				}
			);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	unfollowUser: async (req: any, res: any) => {
		// 		if (req.body.userId !== req.params.id) {
		// 			try {
		// 				const user = await User.findById(req.params.id)
		// 				const currentUser = await User.findById(req.body.userId)
		// 				if (user.followers.includes(req.body.userId)) {
		// 					await user.updateOne({$pull: {followers: req.body.userId}})
		// 					await currentUser.updateOne({ $pull: { followings: req.params.id } })
		// 					res.status(200).json('User has been unfollow ')
		// 				} else {
		// 						res.status(403).json({ error: "You already unfollow this user" });
		// 				}
		// 			} catch (err) {
		// 					res.status(500).json({ error: err.message });
		// 			}
		// 		} else {
		// 			res.status(403).json({error: 'You can\'t unfollow yourself'})
		// 		}

		try {
			User.findByIdAndUpdate(
				req.body.unfollowId,
				{
					$pull: { followers: req.user._id },
				},
				{ new: true },
				(err: any, result: any) => {
					if (err) {
						return res.status(404).json({ error: err.message });
					}
					User.findByIdAndUpdate(
						req.user._id,
						{
							$pull: { followings: req.body.unfollowId },
						},
						{ new: true }
					)
						.select('-password')
						.then((results: any) => {
							res.status(200).json({ message: 'You are unFollowing', results });
						});
				}
			);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	getFriends: async (req: any, res: any) => {
		try {
			const user = await User.findById(req.params.userId);
			const friends = await Promise.all(
				user.followings.map((friendId: any) => {
					return User.findById(friendId);
				})
			);
			// res.status(200).json({ message: 'All my friends', friends })

			let friendsList = <any>[];
			friends.map((friend: any) => {
				const { _id, firstName, lastName, profilePicture } = friend;
				friendsList.push({ _id, firstName, lastName, profilePicture });
			});
			res.status(200).json(friendsList);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
};

module.exports = userControllers;
