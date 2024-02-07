const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Notifications extends Model {}

Notifications.init (
    {   id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        notificationTime: {
          type: DataTypes.DATE
        },
        NotificationType: {
          type: DataTypes.STRING
        },
        iconSelector: {
          type: DataTypes.STRING
        }
      },
      {
        // Link to database connection
        sequelize,
        // Set to false to remove `created_at` and `updated_at` fields
        timestamps: false,
        underscored: true,
        modelName: 'notifications'
      }

)

module.exports = notifications;