const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const fs = require('fs');
const helmet = require('helmet');

const sendResponse = require('./statusCode');
const security = require('./security');

// parse JSON routes file, close server if it isn't a good json
try {
	const routes = JSON.parse(fs.readFileSync('./cfg/routes.json'));
} catch(e) {
	console.error('Parsing error:', e);
	process.exit(1);
}

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(security());

// initialize url -> router
for(let router in routes) {
	app.use(router, require(routes[router]));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// send the error page
	res.status(err.status || 500);
	sendResponse(res, 404);
});

module.exports = app;
