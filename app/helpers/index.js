const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const helpers = {
	hashPassword: (password, saltRound = 10) => {
		return bcrypt.hash(password, saltRound);
	},

	verifyPassword: async (password, hashPassword) => {
		const isMatch = await bcrypt.compare(password, hashPassword);
		return isMatch;
	},

	generateToken: (data, secretToken, option = {}) => {
		return jwt.sign(data, secretToken, option);
	},
}

module.exports = helpers;
