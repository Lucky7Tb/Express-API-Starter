const bcrypt = require('bcrypt');

async function hashPassword(password, saltRound = 10) {
	return await bcrypt.hash(password, saltRound);
}

async function verifyPassword(password, hashPassword) {
	const isMatch = await bcrypt.compare(password, hashPassword);
	return isMatch;
}

module.exports = {
	hashPassword,
	verifyPassword
}
