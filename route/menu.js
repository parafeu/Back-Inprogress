const express = require('express');
const db = require('../db');
const sendResponse = require('../statusCode');
const router = express.Router();

/* GET menu listing. */
router.get('/', function(req, res, next) {
	let code = '404';
	let result = {};

	if(db.base.has('menus').value()) {
		code = 200;
		result = db.base.get('menus').value();
	}

	sendResponse(res, code, result);
})
/* GET menu with id. */
.get('/:id', function(req, res, next) {
	let result = {};

	if(db.base.has('menus').value()) {
		let id = req.params.id;

		if(db.isValidId(id)) {
			result = db.base.get('menus')
				.find({ id: id })
				.value();
		}
	}

	sendResponse(res, 200, result);
})
/* POST menu. */
.post('/', function(req, res, next) {
	if(db.base.has('menus').value()) {
		let menus = db.base.get('menus').value();
		let menuModel = db.getModel('menu');

		if(menuModel) {
			let menu = db.secureJSONAssignment(req.body, menuModel);
			menu.id = db.generateId();

			db.base.get('menus')
				.push(menu)
				.write();
		}
	}

	sendResponse(res, 200);
})
/* PUT menu with id. */
.put('/:id', function(req, res, next) {
	if(db.base.has('menus').value()) {
		let id = req.params.id;
		let menu = db.base.get('menus')
			.find({ id: id })
			.value();

		if(menu.id != undefined) {
			menu = db.secureJSONAssignment(req.body, menu);

			db.base.get('menus')
				.find({ id: id })
				.assign(menu)
				.write();
		}
	}

	sendResponse(res, 200);
})
/* DELETE menu with id. */
.delete('/:id', function(req, res, next) {
	if(db.base.has('menus').value()) {
		let id = req.params.id;
		let menu = db.base.get('menus')
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

