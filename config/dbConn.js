const mongoose = require('mongoose');

module.exports = async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
	} catch (error) {
		console.log(error);
	}
};
