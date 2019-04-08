const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./data/db.json');
const db = low(adapter);
const shortid = require('shortid');

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

/*
 * Returns JSON model
 * Return false if model doesn't exist
 */
function getModel(name) {
	try {
		var model = JSON.parse(fs.readFileSync('./data/model/'+ name +'.json'));
	} catch(e) {
		var model = false;
	}

	return model;
}

/*
 * Returns an random id
 */
function generateId() {
	return shortid.generate();
}

/*
 * Check is Id is valid
 */
function isValidId(id) {
	return shortid.isValid(id);
}

module.exports = { base: db, secureJSONAssignment, getModel, generateId, isValidId };
