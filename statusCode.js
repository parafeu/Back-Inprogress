var fs = require('fs');

// parse JSON routes file, close server if isn't good json
try {
	var code = JSON.parse(fs.readFileSync('./cfg/statusCode.json'));
} catch(e) {
	console.error('Parsing error:', e);
	process.exit(1);
}

var sendResponse = function(res, statusCode, content) {
	var codeJSON = code[statusCode];

	if(codeJSON !== undefined) {
		if(content !== undefined) {
			codeJSON.content = content;
		} else {
			delete codeJSON.content;
		}
	}

	res.status(statusCode).send(codeJSON);
};

module.exports = sendResponse;
