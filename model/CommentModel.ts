const mongooseComments = require('mongoose');
const  UserCommentsObjectId  = mongooseComments.Schema.Types.ObjectId;

const CommentsSchema = new mongooseComments.Schema(
	{
		text: {
			type: String,
		},
		// postedBy: {
		// 	type: UserCommentsObjectId,
		// 	ref: 'User',
		// },
	},
	{ timestamps: true }
);

module.exports = mongooseComments.model('Comments', CommentsSchema)
