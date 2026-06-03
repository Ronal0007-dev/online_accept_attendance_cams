const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendee = sequelize.define('Attendee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'first_name',
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'last_name',
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  },
  childName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'child_name',
    defaultValue: null
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'phone_number',
    validate: {
      notEmpty: true
    }
  },
  submittedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'submitted_at'
  }
}, {
  tableName: 'attendees',
  timestamps: false
});

module.exports = Attendee;
