require('dotenv').config();
const User = require('../models/User');
const helper = require('../helpers');

const AuthController = {
	async login (req, res) {
		try {
			const { email, password } = req.body;

			const [ user ] = await User.query()
				.select('id', 'email', 'password')
				.where('email', email);

			if (!user) {
				return res.status(404).json({
					code: 404,
					message: 'Akun tidak ditemukan',
				});
			}

			const isMatch = await helper.verifyPassword(password, user.password);

			if (!isMatch) {
				return res.status(401).json({
					code: 401,
					message: 'Email atau password salah',
				});
			}

			const dataUser = {
				id: user.id,
				email: user.email,
			};

			const accessToken = helper.generateToken(dataUser, process.env.AUTH_TOKEN);

			return res.status(200).json({
				code: 200,
				data: {
					email: dataUser.email,
				},
				token: accessToken,
				message: 'Berhasil login',
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
