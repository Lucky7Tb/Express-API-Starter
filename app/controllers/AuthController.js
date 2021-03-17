const model = require('../models/');
const operation = model.Sequelize.Op;

async function index(req, res, next) {
	const data = model.User.findAll();
	res.send(data);
}

module.exports = {
	index,
};
