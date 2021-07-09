const User = require('../models/User');

const MyController = {
	async index (req, res, next) {
		res.send(await User.query());
	}
}

module.exports = MyController;
