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
	var defaultdb = JSON.parse(fs.readFileSync('./data/defaultdb.json'));
} catch(e) {
	console.error('Parsing error:', e);
	process.exit(1);
}

db.defaults(defaultdb).write();

module.exports = db;
