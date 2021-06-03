'use strict';

const helpers = require("../../helpers");

module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("users", [
			{
				username: 'Lucky7Tb',
				password: await helpers.hashPassword('12345678'),
				email: 'lucky@mail.com',
				token: null,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
  },

  down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("users", null, {});
  }
};
