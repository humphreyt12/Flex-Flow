const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Workout extends Model {}

Workout.init(
    {
     id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
     },
     workout_name: {
        type: DataTypes.STRING,
        allowNull: false
     },
   
     date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    time: {
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
     modelName: 'workout'
    }, 
);

module.exports = Workout;