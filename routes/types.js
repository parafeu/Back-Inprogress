var express = require('express');
var db = require('../db');
var sendResponse = require('../statusCode');
var router = express.Router();

/* GET types listing. */
router.get('/', function(req, res, next) {
	sendResponse(res, 200, { text: "content request here" });
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
