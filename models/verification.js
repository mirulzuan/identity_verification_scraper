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
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  captchaUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  encodedCaptcha: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

sequelize.sync();

module.exports = Verification;
