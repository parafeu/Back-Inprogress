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
/* GET type with id. */
.get('/:id(\\d+)', function(req, res, next) {
	sendResponse(res, 200, { id: req.params.id, text: "content request here" });
})
/* METHOD not allowed. */
.use(function(req, res, next) {
	sendResponse(res, 405);
});

module.exports = router;
