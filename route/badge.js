const express = require('express');
const db = require('../db');
const sendResponse = require('../statusCode');
const router = express.Router();

/* GET badge listing. */
router.get('/', function(req, res, next) {
	let code = '404';
	let result = {};

	if(db.base.has('badges').value()) {
		code = 200;
		result = db.base.get('badges').value();
	}

	sendResponse(res, code, result);
})
/* GET badge with id. */
.get('/:id', function(req, res, next) {
	let result = {};

	if(db.base.has('badges').value()) {
		let id = req.params.id;

		if(db.isValidId(id)) {
			result = db.base.get('badges')
				.find({ id: id })
				.value();
		}
	}

	sendResponse(res, 200, result);
})
/* POST badge. */
.post('/', function(req, res, next) {
	if(db.base.has('badges').value()) {
		let badges = db.base.get('badges').value();
		let badgeModel = db.getModel('badge');

		if(badgeModel) {
			let badge = db.secureJSONAssignment(req.body, badgeModel);
			badge.id = db.generateId();

			db.base.get('badges')
				.push(badge)
				.write();
		}
	}

	sendResponse(res, 200);
})
/* PUT badge with id. */
.put('/:id', function(req, res, next) {
	if(db.base.has('badges').value()) {
		let id = req.params.id;
		let badge = db.base.get('badges')
			.find({ id: id })
			.value();

		if(badge.id != undefined) {
			badge = db.secureJSONAssignment(req.body, badge);

			db.base.get('badges')
				.find({ id: id })
				.assign(badge)
				.write();
		}
	}

	sendResponse(res, 200);
})
/* DELETE badge with id. */
.delete('/:id', function(req, res, next) {
	if(db.base.has('badges').value()) {
		let id = req.params.id;
		let badge = db.base.get('badges')
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

