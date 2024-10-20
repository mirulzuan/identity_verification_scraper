const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Verification = sequelize.define('Verification', {
  identifier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  result: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cookies : {
    type: DataTypes.JSON,
    allowNull: true,
  },
  captchaUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelize.sync();

module.exports = Verification;
