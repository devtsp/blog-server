const mongoose = require('mongoose');

module.exports = mongoose.model(
	'Post',
	new mongoose.Schema({
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		createdAt: {
			type: String,
			required: true,
		},
		lastUpdated: {
			type: String,
			required: true,
		},
	})
);
