require('dotenv').config();
const model = require('@models');
const { generateToken, verifyPassword } = require('@helpers');
const operation = model.Sequelize.Op;

const AuthController = {
	login: async (req, res) => {
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

			const isMatch = verifyPassword(password, user.password);

			if (isMatch) {
				const dataUser = {
					id: user.id,
					username: user.username,
					email: user.email,
				};

				const accessToken = generateToken(dataUser, process.env.AUTH_TOKEN);

				return res.status(200).json({
					code: 200,
					data: {
						username: dataUser.username,
						email: dataUser.email,
					},
					token: accessToken,
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
	},
};

module.exports = AuthController;
