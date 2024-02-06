const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CoolDown extends Model {}

CoolDown.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
         },

         cooldown_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
          time: {
            type: DataTypes.INTEGER,
        }, 
         sequelize,
         timestamps: false,
         freezeTableName: true,
         underscored: true,
         modelName: 'diet',
    },
);

module.exports = CoolDown;