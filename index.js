const path = require('path');
const envFilePath =  path.join(__dirname, `${process.env.NODE_ENV}.env`)

require('dotenv').config({ path: envFilePath});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const connectDB = require('./config/dbConn');
const logger = require('./middleware/logEvents');

const app = express();
const PORT = process.env.PORT || 3500;
connectDB();

//MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger);

//ROUTES
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/root'));
app.use('/posts', require('./routes/api/posts'));

//404
app.all('*', (req, res) => {
	res.status(404);
	if (req.accepts('html'))
		res.sendFile(path.join(__dirname, 'views', '404.html'));
	else if (req.accepts('json')) res.json({ error: '404 Not Found' });
	else res.type('txt').send('404 Not Found');
});

mongoose.connection.once('open', () => {
	console.log('>> Connecteced to MongoDB');
	app.listen(PORT, () => console.log(`>> Server running on port ${PORT}`));
});
