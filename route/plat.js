const express = require('express');
const db = require('../db');
const sendResponse = require('../statusCode');
const router = express.Router();

/* GET plat listing. */
router.get('/', function(req, res, next) {
	let code = '404';
	let result = {};

	if(db.base.has('plats').value()) {
		code = 200;
		result = db.base.get('plats').value();
	}

	sendResponse(res, code, result);
})
/* GET plat with id. */
.get('/:id', function(req, res, next) {
	let result = {};

	if(db.base.has('plats').value()) {
		let id = req.params.id;

		if(db.isValidId(id)) {
			result = db.base.get('plats')
				.find({ id: id })
				.value();
		}
	}

	sendResponse(res, 200, result);
})
/* POST plat. */
.post('/', function(req, res, next) {
	if(db.base.has('plats').value()) {
		let plats = db.base.get('plats').value();
		let platModel = db.getModel('plat');

		if(platModel) {
			let plat = db.secureJSONAssignment(req.body, platModel);
			plat.id = db.generateId();

			db.base.get('plats')
				.push(plat)
				.write();
		}
	}

	sendResponse(res, 200);
})
/* PUT plat with id. */
.put('/:id', function(req, res, next) {
	if(db.base.has('plats').value()) {
		let id = req.params.id;
		let plat = db.base.get('plats')
			.find({ id: id })
			.value();

		if(plat.id != undefined) {
			plat = db.secureJSONAssignment(req.body, plat);

			db.base.get('plats')
				.find({ id: id })
				.assign(plat)
				.write();
		}
	}

	sendResponse(res, 200);
})
/* DELETE plat with id. */
.delete('/:id', function(req, res, next) {
	if(db.base.has('plats').value()) {
		let id = req.params.id;
		let plat = db.base.get('plats')
			.remove({ id: id })
			.write();
	}

	sendResponse(res, 200);
})
/* METHOD not allowed. */
.use(function(req, res, next) {
	sendResponse(res, 405);
});

module.exports = router;

