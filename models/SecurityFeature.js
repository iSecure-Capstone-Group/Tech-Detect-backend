const { DataTypes } = require('sequelize');
const db = require('../config/db');

const SecurityFeature = db.define('SecurityFeature', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  // Other fields
});

module.exports = SecurityFeature;