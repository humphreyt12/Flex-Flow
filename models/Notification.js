const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Notification extends Model {}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Include other fields as necessary, for example:
    notificationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dayOfWeek: {
      type: DataTypes.STRING,
      allowNull: true, // Only needed for specificDay notification types
    },
    specificDate: {
      type: DataTypes.DATEONLY,
      allowNull: true, // Only needed for specificDate notification types
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'notification',
    timestamps: true, // Add createdAt and updatedAt timestamps
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Notification;
