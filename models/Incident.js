const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Incident = db.define('Incident', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  severity: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Open', 'Closed', 'InProgress'),
    allowNull: false
  },
  // Other fields
});

module.exports = Incident;