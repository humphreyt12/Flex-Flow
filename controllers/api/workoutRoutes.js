const router = require('express').Router();
const { Workout } = require('../../models');
const withAuth = require('../../utils/auth');

//GET request for Workout
router.get('/', async (req, res) => {
    try {
      // Get all workouts and JOIN with user data
      const workoutData = await Workout.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  // Serialize data so the template can read it
  const workouts = workoutData.map((workout) => workout.get({ plain: true }));
  // Pass serialized data and session flag into template
  res.render('myworkout',{ 
    workouts,
    logged_in: req.session.logged_in
  });
  } catch (err) {
  res.status(500).json(err);
  }
  });

//POST request for new Workout
router.post('/', withAuth, async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newWorkout); // Corrected variable name here
  } catch (err) {
    res.status(400).json(err);
  }
});

//DELETE request by id 
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const workoutData = await Workout.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    //If request is succesfull, the id should not be found
    if (!workoutData) {
      res.status(404).json({ message: 'No workout found with this id!' });
      return;
    }

    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;