const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
const config = require(__dirname + '/../../config/database.js')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config.options);

const models = {
	User: require('./User.js')(sequelize, Sequelize.DataTypes)
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
