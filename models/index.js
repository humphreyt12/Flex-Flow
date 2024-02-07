const User = require('./User');
const Workout = require('./Workout');
const Diet = require('./Diet');
const WarmUp = require('./WarmUp');
const CoolDown = require('./CoolDown');

User.hasMany(Workout, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Workout.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Diet, {
    foreignKey: 'user_id'
});

Diet.belongsTo(User, {
    foreignKey: 'user_id'
});



module.exports = { User, Workout, Diet, WarmUp, CoolDown };