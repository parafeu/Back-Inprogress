const express = require('express');
const db = require('../db');
const sendResponse = require('../statusCode');
const router = express.Router();

/* GET producteur listing. */
router.get('/', function(req, res, next) {
	let code = '404';
	let result = {};

	if(db.base.has('producteurs').value()) {
		code = 200;
		result = db.base.get('producteurs').value();
	}

	sendResponse(res, code, result);
})
/* GET producteur with id. */
.get('/:id', function(req, res, next) {
	let result = {};

	if(db.base.has('producteurs').value()) {
		let id = req.params.id;

		if(db.isValidId(id)) {
			result = db.base.get('producteurs')
				.find({ id: id })
				.value();
		}
	}

	sendResponse(res, 200, result);
})
/* POST producteur. */
.post('/', function(req, res, next) {
	if(db.base.has('producteurs').value()) {
		let producteurs = db.base.get('producteurs').value();
		let producteurModel = db.getModel('producteur');

		if(producteurModel) {
			let producteur = db.secureJSONAssignment(req.body, producteurModel);
			producteur.id = db.generateId();

			//producteurs.push(producteur);

			db.base.get('producteurs')
				.push(producteur)
				.write();
		}
	}

	sendResponse(res, 200);
})
/* PUT producteur with id. */
.put('/:id', function(req, res, next) {
	if(db.base.has('producteurs').value()) {
		let id = req.params.id;
		let producteur = db.base.get('producteurs')
			.find({ id: id })
			.value();

		if(producteur.id != undefined) {
			producteur = db.secureJSONAssignment(req.body, producteur);

			db.base.get('producteurs')
				.find({ id: id })
				.assign(producteur)
				.write();
		}
	}

	sendResponse(res, 200);
})
/* DELETE producteur with id. */
.delete('/:id', function(req, res, next) {
	if(db.base.has('producteurs').value()) {
		let id = req.params.id;
		let producteur = db.base.get('producteurs')
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

