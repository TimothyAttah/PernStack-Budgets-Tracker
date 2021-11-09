const Post = require('../model/PostModel');
const UserPost = require('../model/UserModel');
const PostComment = require('../model/CommentModel');

const postControllers = {
	createPost: async (req: any, res: any) => {
		const newPost = req.body;
		const { userId, desc, img } = newPost;
		try {
			req.user.password = undefined;
			const post = await new Post({
				userId,
				desc,
				img,
				postedBy: req.user,
			});
			await post.save();
			res.status(200).json({ message: 'New post created', post });
		} catch (err) {
			return res.status(500).json({ error: err });
		}
	},
	allPosts: async (req: any, res: any) => {
		try {
			const posts = await Post.find()
				.sort({ createdAt: -1 })
				.populate('postedBy', '-password')
				.populate(
					'comments.postedBy',
					'_id firstName lastName profilePicture createdAt'
				);
			res.status(200).json({ message: 'All posts', posts });
		} catch (err) {
			return res.status(500).json({ error: err });
		}
	},
	myPosts: async (req: any, res: any) => {
		try {
			const posts = await Post.find({ postedBy: req.user._id })
				.sort({ createdAt: -1 })
				.populate('postedBy', '-password')
				.populate(
					'comments.postedBy',
					'_id firstName lastName profilePicture createdAt'
				);
			res.status(200).json({ message: 'My posts', posts });
		} catch (err) {
			return res.status(500).json({ error: err });
		}
	},
	likePost: async (req: any, res: any) => {
		try {
			const post = await Post.findById(req.params.id);
			if (!post.likes.includes(req.body.userId)) {
				await post
					.updateOne({ $push: { likes: req.body.userId } })
					.populate('postedBy', '-password')
					.populate(
						'comments.postedBy',
						'_id firstName lastName profilePicture createdAt'
					);
				res.status(200).json({ message: 'The post has been liked.' });
			} else {
				await post.updateOne({ $pull: { likes: req.body.userId } });
				res.status(200).json({ message: 'The post has been disliked.' });
			}
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: err });
		}
	},

	deletePost: async (req: any, res: any) => {
		try {
			await Post.findOne({ _id: req.params.postId })
				.populate('postedBy', '_id')
				.exec(async (err: any, post: any) => {
					if (err) {
						return res.status(404).json({ error: err.message });
					}
					if (post.postedBy._id.toString() === req.user._id.toString()) {
						const deletedPost = await post.remove();
						return res
							.status(200)
							.json({ message: 'Post deleted successfully', deletedPost });
					}
				});
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: err });
		}
	},
	createPostComment: async (req: any, res: any) => {
		const { id } = req.params;
		const { text } = req.body;
		try {
			req.user.password = undefined;
			const postComment = {
				text,
				postedBy: req.user._id,
			};
			const post = await Post.findByIdAndUpdate(
				id,
				{
					$push: { comments: postComment },
				},
				{ new: true }
			)
				.populate('postedBy', '-password')
				.populate(
					'comments.postedBy',
					'_id firstName lastName profilePicture createdAt'
				);
			res.status(200).json({ message: 'You commented', post });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: err });
		}
	},

	allPostComment: async (req: any, res: any) => {
		try {
			const { id } = req.params;
			// const post = await Post.findById(id)
			const comment = await PostComment.find({ _id: req.params.id })
				.sort({ createdAt: -1 })
				.populate('postedBy', '-password');
			// .populate(
			// 	'comments.postedBy',
			// 	'_id firstName lastName profilePicture createdAt'
			// )

			// .exec(async (err: any, post: any) => {
			// 	if (err) {
			// 		return res.status(404).json({ error: err.message });
			// 	} else {
			// 		res.status(200).json({ message: 'All posts', post });
			// 	}
			// });
			res.status(200).json({ message: 'All posts comments', comment });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: err });
		}
	},

	deletePostComments: async (req: any, res: any) => {
		try {
			const { id } = req.params;
			const { text } = req.body;

			req.user.password = undefined;
			const postComment = {
				postedBy: req.user._id,
			};
			const deletePostComment = await Post.findByIdAndUpdate(
				id,
				{
					$pull: { comments: postComment },
				},
				{ new: true }
			)
				.populate('postedBy', '-password')
				.populate(
					'comments.postedBy',
					'_id firstName lastName profilePicture createdAt'
				);
			res
				.status(200)
				.json({ message: ' commented deleted', deletePostComment });

			// await Post.findOne({ _id: req.params.id })
			// 	.populate('postedBy', '_id')
			// 	.exec(async (err: any, post: any) => {
			// 		if (err) {
			// 			return res.status(404).json({ error: err.message });
			// 		}
			// 		if (post.postedBy._id.toString() === post.comments._id.toString()) {
			// 			const deletedNote = await post.remove();
			// 			return res
			// 				.status(200)
			// 				.json({ message: 'Note deleted successfully', deletedNote });
			// 		}
			// 	});
			// const deleteComment = await Post.findByIdAndDelete(req.params.id)
			// res.status(200).json({message: 'Comment deleted', deleteComment})
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: err });
		}
	},
};

module.exports = postControllers;
