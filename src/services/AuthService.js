const User = require("../models/User");
const { jwtHelper, hashHelper, dateHelper } = require("../helpers");

async function login(res, userData) {
	try {
		const { email, password } = userData;
		const user = await User.getOne(["id", "name", "email", "password"], {
			email
		});

		if (!user) {
			res.status(404);
			throw new Error("Account not found");
		}

		const isMatch = await hashHelper.verifyPassword(password, user.password);

		if (!isMatch) {
			res.status(404);
			throw new Error("Account not found");
		}

		delete user.password;

		const token = jwtHelper.generateToken(user, process.env.AUTH_TOKEN, {
			expiresIn: "1d",
		});

		return {
			user,
			token,
		};
	} catch (error) {
		throw error;
	}
}

async function register(res, userData) {
	try {
		const { name, email, password } = userData;

		const user = await User.getOne(["id"], {
			email
		});
		if (user) {
			res.status(400);
			throw new Error("Email already in use");
		}

		const hashPassword = await hashHelper.hashPassword(password);
		await User.insert({
			name,
			email,
			password: hashPassword,
			created_at: dateHelper.createTimeStamp(),
			updated_at: dateHelper.createTimeStamp(),
		});
	} catch (error) {
		throw error;
	}
}

module.exports = {
	login,
	register,
};
