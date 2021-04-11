const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

function hashPassword(password, saltRound = 10) {
	return bcrypt.hash(password, saltRound);
}

function generateToken(data, secretToken, option = {}) {
	return jwt.sign(data, secretToken, option);
}

module.exports = {
	hashPassword,
	generateToken
};