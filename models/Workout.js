const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Workout extends Model {}

Workout.init(
    {
     id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      workout: {
        type: DataTypes.STRING,
      },
     date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
     },

     schedule: {
        type: DataTypes.INTEGER, 
     },
     date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.STRING,
    },

 

     sequelize,
     timestamps: false,
     freezeTableName: true,
     underscored: true,
     modelName: 'workout',
   
    }, 
);

module.exports = Workout;
