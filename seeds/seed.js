//Using sequelize to connect to the models
const sequelize = require('../config/connection');
const { User, Workout, Diet } = require('../models');

const userData = require('./userData.json');
const workoutData = require('./workoutData.json');
const dietData = require('./dietData.json');
try {
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const workout of workoutData) {
    await Workout.create({
      ...workout,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const diet of dietData) {
    await Diet.create({
      ...diet,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};
seedDatabase();

} catch (error) {
  console.error('Seeding failed:', error);
}