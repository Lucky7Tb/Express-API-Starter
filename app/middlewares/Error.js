const error = function (error, req, res, next) {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res
		.status(statusCode)
		.json({
			'status': statusCode,
			'message': error.message
		});
}

module.exports = error;
