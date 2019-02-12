var db = require('./db');
var sendResponse = require('./statusCode');

function security() {
	return function security(req, res, next) {
		next();
	};
};

module.exports = security;
