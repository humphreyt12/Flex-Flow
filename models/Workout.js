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
     workout_name: {
        type: DataTypes.STRING,
        allowNull: false,
     },
     time_line: {
        type: DataTypes.INTEGER, 
     },
     warm_up: {
        type: DataTypes.STRING,
        validate: {
            isWarm_Up: true,
        },
     },
     cool_down: {
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
