/*const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/francepapilles.db3', sqlite3.OPEN_READWRITE, function(err) {
	if(err !== null)
	{
		console.error(err);
		process.exit(1);
	}
});*/

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ posts: [], user: {} }).write();

module.exports = db;
