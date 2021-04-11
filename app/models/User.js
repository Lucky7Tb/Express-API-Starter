const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
		email: DataTypes.STRING,
		token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
		underscored: true,
  });
  return User;
};