require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const connectDB = require('./config/dbConn');
const logger = require('./middleware/logEvents');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3500;
connectDB();

//MIDDLEWARE
app.use(logger);
app.use(cors());

//ROUTES
app.use(express.static('/public'));

app.get('/', (req, res) => {
	res.status(400);
	return res.status(400).json({ error: 'Not Found' });
});

mongoose.connection.once('open', () => {
	console.log('>> Connecteced to MongoDB');
	app.listen(PORT, () => console.log(`>> Server running on port ${PORT}`));
});
