const express = require('express');
const db = require('../db');
const sendResponse = require('../statusCode');
const router = express.Router();

/* GET config listing. */
router.get('/', function(req, res, next) {
	let code = '404';
	let result = {};

	if(db.has('config').value()) {
		code = 200;
		result = db.get('config').value();
	}

	sendResponse(res, code, result);
})
/* PUT config. */
.put('/', function(req, res, next) {
	console.log(req.body)

	if(db.has('config').value()) {
		let config = db.get('config').value();

		for(conf in config) {
			console.log(conf);
		}
	}

	sendResponse(res, 200);
})
/* METHOD not allowed. */
.use(function(req, res, next) {
	sendResponse(res, 405);
});

module.exports = router;
