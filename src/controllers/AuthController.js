const validation = require("../validation/AuthValidation");
const authService = require("../services/AuthService");

async function login(req, res, next) {
	try {
		const { value, error } = validation.loginValidation(req.body);

		if (error) {
			res.status(400);
			throw new Error(error.details[0].message);
		}

		const userData = await authService.login(res, value);

		return res.status(200).json({
			statusCode: 200,
			message: "Success login",
			data: userData,
		});
	} catch (error) {
		next(error);
	}
}

async function register(req, res, next) {
	try {
		const { value, error } = validation.registerValidation(req.body);

		if (error) {
			res.status(400);
			throw new Error(error.details[0].message);
		}

		await authService.register(res, value);

		return res.status(201).json({
			statusCode: 201,
			message: "Success register",
		});
	} catch (error) {
		next(error);
	}
}

module.exports = {
	login,
	register,
};
