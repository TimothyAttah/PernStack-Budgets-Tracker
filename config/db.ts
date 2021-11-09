const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const mongoDB = await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			// useCreateIndex: true,
			// useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB connected on ${mongoDB.connection.host}`);
	} catch (error) {
		console.log(error);
	}
};

module.exports = connectDB;
