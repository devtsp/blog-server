const express = require('express');
const router = express.Router();
const path = require('path');

const rootRegEx = '^/$|index(.html)?';

module.exports = router.get(rootRegEx, (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
