require('dotenv').config();
const { jwtHelper } = require("../helpers");

function Authenticated(req, res, next) {
	let token = req.headers['authorization'];

	if(typeof token === 'undefined') {
		return res
			.status(403)
			.json({
				'message': 'unauthorized'
			});
	}

	token = token.split(' ')[1];

	jwtHelper.verifyToken(
		token,
		process.env.AUTH_TOKEN,
		function (error, payload) {
			if (error) {
				return res.status(401).json({
					message: "unauthenticated",
				});
			}
			req.user = payload;
			next();
		}
	);
}

module.exports = Authenticated;
