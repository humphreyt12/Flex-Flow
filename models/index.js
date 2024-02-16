const User = require('./User');
const Workout = require('./Workout');
const Diet = require('./Diet');
const Notification = require('./Notification');

User.hasMany(Workout, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Workout.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Diet, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Diet.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Notification, {
  foreignKey: 'user_id',
  as: 'Notification', // Alias for the association
  onDelete: 'CASCADE'
});

Notification.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

module.exports = { User, Workout, Diet, Notification};

