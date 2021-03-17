'use strict';

const utils = require('../../utils/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("users", [
			{
				username: 'Lucky7Tb',
				password: await utils.hashPassword('12345678'),
				email: 'lucky@mail.com',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
  },

  down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("users", null, {});
  }
};
