const router = require('express').Router()
const userRoutes = require('./userRoutes')
const workoutRoutes = require('./workoutRoutes');
const dietRoutes = require('./dietroutes');
const notificationRoutes = require('./notificationRoutes')

router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);
router.use('/diets', dietRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;