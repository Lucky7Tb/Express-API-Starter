require('dotenv').config();
const { Sequelize } = require('sequelize');

const DB = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DRIVER,
		logging: console.log(),
		pool: {
			max: parseInt(process.env.POOL_MAX),
			min: parseInt(process.env.POOL_MIN),
			idle: parseInt(process.env.POOL_IDLE),
			acquire: parseInt(process.env.POOL_ACQUIRE),
		},
	}
);

module.exports = DB;