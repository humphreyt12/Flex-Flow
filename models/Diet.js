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
         diet_name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         recipe_name: {
            type: DataTypes.STRING,
         },
         meal_type: {
            type: DataTypes.STRING,
         },
         calories: {
            type: DataTypes.INTEGER,
         },
         sequelize,
         timestamps: false,
         freezeTableName: true,
         underscored: true,
         modelName: 'diet',
    },
);

module.exports = Diet;