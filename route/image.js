const express = require('express');
const db = require('../db');
const sendResponse = require('../statusCode');
const router = express.Router();

/* GET image listing. */
router.get('/', function(req, res, next) {
	let code = '404';
	let result = {};

	if(db.base.has('images').value()) {
		code = 200;
		result = db.base.get('images').value();
	}

	sendResponse(res, code, result);
})
/* GET image with id. */
.get('/:id', function(req, res, next) {
	let result = {};

	if(db.base.has('images').value()) {
		let id = req.params.id;

		if(db.isValidId(id)) {
			result = db.base.get('images')
				.find({ id: id })
				.value();
		}
	}

	sendResponse(res, 200, result);
})
/* POST image. */
.post('/', function(req, res, next) {
	if(db.base.has('images').value()) {
		let images = db.base.get('images').value();
		let imgModel = db.getModel('image');

		if(imgModel) {
			let image = db.secureJSONAssignment(req.body, imgModel);
			image.id = db.generateId();

			//images.push(image);

			db.base.get('images')
				.push(image)
				.write();
		}
	}

	sendResponse(res, 200);
})
/* PUT image. */
.put('/:id', function(req, res, next) {
	if(db.base.has('images').value()) {
		let id = req.params.id;
		let image = db.base.get('images')
			.find({ id: id })
			.value();

		if(image.id != undefined) {
			image = db.secureJSONAssignment(req.body, image);

			db.base.get('images')
				.find({ id: id })
				.assign(image)
				.write();
		}
	}

	sendResponse(res, 200);
})
/* METHOD not allowed. */
.use(function(req, res, next) {
	sendResponse(res, 405);
});

module.exports = router;

