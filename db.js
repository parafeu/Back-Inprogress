var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./data/francepapilles.db3', sqlite3.OPEN_READWRITE, function(err) {
	if(err !== null)
	{
		console.error(err);
		process.exit(1);
	}
});

module.exports = db;
