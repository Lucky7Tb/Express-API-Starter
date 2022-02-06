const Model = require('./Model');
const table = "users";
const User = {
	async getOne(column, where) {
		try {
			return await Model(table).column(column).where(where).first();
		} catch (error) {
			throw error;
		}
	},
	async insert(data) {
		try {
			return await Model(table).insert(data);
		} catch (error) {
			throw error;
		}
	}
}
module.exports = User;
