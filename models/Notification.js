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
    notificationColor: {
      type: DataTypes.STRING,
      allowNull: false, // Assuming color is optional
    },
    notificationIcon: {
      type: DataTypes.STRING,
      allowNull: false, // Assuming icon is optional
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
    timestamps: true, // Add createdAt and updatedAt timestamps
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Notification;
