/*const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/francepapilles.db3', sqlite3.OPEN_READWRITE, function(err) {
	if(err !== null)
	{
		console.error(err);
		process.exit(1);
	}
});*/

const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./data/db.json');
const db = low(adapter);

try {
	var dbModel = JSON.parse(fs.readFileSync('./data/model/db.json'));
	var configModel = JSON.parse(fs.readFileSync('./data/model/config.json'));
} catch(e) {
	console.error('Parsing error:', e);
	process.exit(1);
}

dbModel.config = configModel;

db.defaults(dbModel).write();

/*
 * Update output JSON with input JSON only on keys exist in output
 * It doesn't create new keys in output JSON
 */
function secureJSONAssignment(input, output) {
	for(index in input) {
		if(index in output) {
			if(typeof output[index] === 'object') {
				output[index] = secureJSONAssignment(input[index], output[index]);
			} else {
				output[index] = input[index];
			}
		}
	}

	return output;
}

module.exports = { base: db, secureJSONAssignment };
