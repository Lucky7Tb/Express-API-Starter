const bcrypt = require('bcrypt');

async function hashPassword(password, saltRound = 10) {
	return await bcrypt.hash(password, saltRound);
}

module.exports = {
	hashPassword,
};