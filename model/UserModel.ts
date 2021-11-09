const userMongoose = require('mongoose');
const UserObjectId = userMongoose.Schema.Types.ObjectId;

const UserSchema = new userMongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 3,
			max: 10,
		},
		lastName: {
			type: String,
			required: true,
			min: 3,
			max: 10,
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 20,
		},
		profilePicture: {
			type: String,
			default: '',
		},
		coverPicture: {
			type: String,
			default: '',
		},
		// followers: {
		// 	type: Array,
		// 	default: [],
		// },
		// followings: {
		// 	type: Array,
		// 	default: [],
		// },
		followers: [{ type: UserObjectId, ref: 'User' }],
		followings: [{ type: UserObjectId, ref: 'User' }],
		isAdmin: {
			type: Boolean,
			default: false,
		},
		desc: {
			type: String,
			max: 50,
		},
		city: {
			type: String,
			max: 50,
		},
		from: {
			type: String,
			max: 50,
		},
		relationship: {
			type: Number,
			enum: [1, 2, 3],
		},
	},
	{ timestamps: true }
);

module.exports = userMongoose.model('User', UserSchema);
