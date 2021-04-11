require('dotenv').config();
const model = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/utils');
const operation = model.Sequelize.Op;

async function login(req, res) {
	try {
		const { email, password } = req.body;

		const user = await model.User.findOne({
			where: { email: email },
			attributes: ['id', 'username', 'email', 'password'],
		});

		if (!user) {
			return res.status(401).json({
				code: 401,
				message: 'Akun tidak ditemukan',
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (isMatch) {
			const dataUser = {
				id: user.id,
				username: user.username,
				email: user.email,
			}

			const accessToken = generateToken(
				dataUser,
				process.env.AUTH_TOKEN,
				{
					expiresIn: "2m", //2 minutes
				}
			);

			const refreshToken = generateToken(
				dataUser,
				process.env.AUTH_REFRESH_TOKEN
			);

			await model["User"].update(
				{ token: refreshToken },
				{
					where: {
						id: dataUser.id,
					},
				}
			);
			
			return res.status(200).json({
				code: 200,
				data: {
					username: dataUser.username,
					email: dataUser.email,
				},
				token: {
					accessToken: accessToken,
					refreshToken: refreshToken,
				},
				message: 'Berhasil login',
			});
		}

		return res.status(401).json({
			code: 401,
			message: 'Email atau password salah',
		});
	} catch (err) {
		return res.status(500).json({
			code: 500,
			message: 'Terjadi kesalahan pada server',
		});
	}
}

async function refreshToken(req, res) {
	const refreshToken = req.body.refreshToken;

	const user = await model.User.findOne({
		where: { token: refreshToken },
		attributes: ["id"],
	});

	if (!user) {
		return res.status(401).json({
			code: 401,
			message: 'Akun tidak ditemukan',
		});
	}

	jwt.verify(refreshToken, process.env.AUTH_REFRESH_TOKEN, (err, user) => {
		if(err){
			return res.status(403).json({
				code: 403,
				message: "Forbidden",
			});
		}

		const accessToken = jwt.sign(user, process.env.AUTH_TOKEN, {
			expiresIn: "2m", //2 minutes
		});

		return res.status(200).json({
			code: 200,
			accessToken,
		});
	})

}

module.exports = {
	login,
	refreshToken
};
