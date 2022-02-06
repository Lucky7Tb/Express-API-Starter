const jwt = require("jsonwebtoken");

function generateToken(data, secretToken, option = {}) {
	return jwt.sign(data, secretToken, option);
}

function verifyToken(token, secretToken, callback) {
	jwt.verify(token, secretToken, callback);
}

module.exports = {
	generateToken,
	verifyToken
}
