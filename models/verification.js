const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

// VERIFICATION MODEL
const Verification = sequelize.define('Verification', {
  identifier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  result: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

sequelize.sync();

module.exports = Verification;
