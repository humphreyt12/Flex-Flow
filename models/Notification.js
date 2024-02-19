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
    notificationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dayOfWeek: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    specificDate: {
      type: DataTypes.DATEONLY,
      allowNull: true, 
    },
    notificationColor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notificationIcon: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        field: 'user_id',
      },
    },
  },
  {
    sequelize,
    modelName: 'notification',
    timestamps: true, 
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Notification;
