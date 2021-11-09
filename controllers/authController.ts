const AuthUser = require('../model/UserModel');
const userBcrypt = require('bcryptjs');
const userJwt = require('jsonwebtoken');

const authControllers = {
	signUp: async (req: any, res: any) => {
		const userData = req.body;
		const { firstName, lastName, email, password } = userData;

		if (!firstName || !lastName || !email || !password)
			return res.status(422).json({ error: 'Please fill in all fields' });

		const user = await AuthUser.findOne({ email });
		if (user)
			return res
				.status(400)
				.json({ error: 'User with this email already exists.' });

		const hashedPassword = await userBcrypt.hash(password, 12);

		try {
			const user = await new AuthUser({
				firstName,
				lastName,
				email,
				password: hashedPassword,
			});
			await user.save();
			res.status(200).json({ message: 'User successfully signup.', user });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
	signIn: async (req: any, res: any) => {
		const userData = req.body;
		const { email, password } = userData;

		if (!email || !password)
			return res.status(422).json({ error: 'Please fill in all fields' });

		try {
			const user = await AuthUser.findOne({ email });
			if (!user)
				return res.status(400).json({ error: 'Wrong password or email' });

			const confirmedPassword = await userBcrypt.compare(
				password,
				user.password
			);
			if (!confirmedPassword)
				return res.status(400).json({ error: 'Wrong password or email' });

			const token = userJwt.sign({ _id: user._id }, process.env.JWT_SECRET);

			user.password = undefined;
			res
				.status(200)
				.json({
					message: 'User successfully signed in.',
					token,
					results: user,
				});
		} catch (err) {
			res.status(500).json({ error: err });
		}
	},
	getUsers: async (req: any, res: any) => {
		try {
			const allUsers = await AuthUser.find();
			allUsers.password = undefined;
			res.status(200).json({ message: 'All users', allUsers });
		} catch (err) {
			res.status(500).json({ error: err });
		}
	},
};

module.exports = authControllers;
