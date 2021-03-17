const model = require('../models/');
const bcrypt = require('bcrypt');
const operation = model.Sequelize.Op;

async function login(req, res, next) {
	const { email, password } = req.body;
	
	const user = await model.User.findOne({
		where: { email: email },
		attributes: ['id', 'username', 'email', 'password']
	});

	if(!user){
		return res.send('Akun tidak ditemukan');
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (isMatch) {
		return res.send('Berhasil login');
	}

	return res.send('Tidak berhasil login');
}

module.exports = {
	login,
};
