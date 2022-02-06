const Joi = require("joi");

function loginValidation(data) {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	});

	return schema.validate(data, {
		stripUnknown: true
	});
}

function registerValidation(data) {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		password_confirm: Joi.any()
			.equal(Joi.ref("password"))
			.required()
			.messages({ "any.only": "Password not match" }),
	});

	return schema.validate(data, {
		stripUnknown: true
	});
}

module.exports = {
	loginValidation,
	registerValidation
}
