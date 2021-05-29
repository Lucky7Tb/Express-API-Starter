require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: parseInt(process.env.DB_HOST),
		port: parseInt(process.env.DB_PORT),
		dialect: process.env.DB_DRIVER,
		pool: {
			max: parseInt(process.env.POOL_MAX),
			min: parseInt(process.env.POOL_MIN),
			idle: parseInt(process.env.POOL_IDLE),
			acquire: parseInt(process.env.POOL_ACQUIRE)
		},
	}
);

const models = {
	User: require('./User.js')(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((modelName) => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
