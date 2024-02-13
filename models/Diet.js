const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Diet extends Model {}

Diet.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
         },
         mealName: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         mealDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
          },
         mealTime: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: DataTypes.NOW
          },
         user_id: {
            type: DataTypes.INTEGER,
            references: {
            model: 'user',
            key: 'id',
          },
         },
      },
      {
         sequelize,
         timestamps: false,
         freezeTableName: true,
         underscored: true,
         modelName: 'diet',
    },
);

module.exports = Diet;