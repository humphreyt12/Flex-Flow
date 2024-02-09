//Using sequelize to connect to the models
const sequelize = require('../config/connection');
const { User, Workout, Diet } = require('../models');

const userData = require('./userData.json');
const workoutData = require('./workoutData.json');
const dietData = require('./dietData.json');

//Forcing the models and recreating their data
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

  const diets = await Diet.bulkCreate(dietData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();