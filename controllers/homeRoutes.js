const router = require('express').Router();

const { Diet, User, Workout, Notification } = require('../models');
const withAuth = require('../utils/auth');


router.get('/myworkouts', async (req, res) => {
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
    res.render('myworkouts', {
      workouts,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET response by workout id
router.get('/workout/:id', async (req, res) => {
  try {
    const workoutData = await Workout.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Workout,
          include: [User]
        },
        {
          model: Diet,
          include: [User]
        },
        {
          model: Notification,
          include: [User]
        },
      ],
    });

    const workout = workoutData.get({ plain: true });
    //Creating the workouts 
    res.render('workout', {
      ...workout,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




//GET response by workout id
router.get('/diet/:id', async (req, res) => {
try {
const dietData = await Diet.findByPk(req.params.id, {
  include: [
    {
      model: User,
      attributes: ['name'],
    },
    {
      model: Diet,
      include: [User]
    },
  ],
});

const diet = dietData.get({ plain: true });
//Creating the workouts 
res.render('diet', { 
  ...diet,
  logged_in: req.session.logged_in
});
} catch (err) {
res.status(500).json(err);
}
});

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
  console.log('Accessing /homepage route'); // Log when route is accessed

  try {
    console.log('Session User ID:', req.session.user_id); // Log the session user ID to verify it exists

    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Workout }, { model: Diet }, {model: Notification}], // Ensure models are properly included
    });

    if (!userData) {
      console.log('No user data found for session ID:', req.session.user_id); // Log if no user data is found
      res.status(404).send('User not found');
      return;
    }

    const user = userData.get({ plain: true });
    console.log('User data for homepage:', user); // Log the user data being passed to the template

    //Creating the dashboard
    res.render('homepage', {
      user, 
      logged_in: req.session.logged_in // Use req.session.logged_in directly
    });

  } catch (err) {
    console.error('Error accessing /homepage:', err); // Log any errors encountered
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});


router.get('/signup', (req, res) => {
  console.log('About to render signup');
  res.render('signup'); // Example without using a layout
});

router.get('/help', (req, res) => {
  console.log('About to render help');
  res.render('help'); // Example without using a layout
});

router.get('/homepage', (req, res) => {
  console.log('About to render homepage');
  res.render('homepage'); 
});

router.get('/myworkouts', (req, res) => {
  console.log('About to render myworkouts');
  res.render('myworkouts'); 
});

router.get('/mydiet', (req, res) => {
  console.log('About to render mydiet');
  res.render('mydiet'); // Example without using a layout
});

router.get('/methods', (req, res) => {
  console.log('About to render methods');
  res.render('methods'); // Example without using a layout
});

router.get('/dietplans', (req, res) => {
  console.log('About to render dietplans');
  res.render('dietplans'); // Example without using a layout
});


router.get('/mynotifications', (req, res) => {
  console.log('About to render notifications');
  res.render('mynotifications'); // Example without using a layout
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});




 


//If the user dose not have a login, redirect the page for the user to signup
// router.get('/signUp', (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect('/homepage');
//     return;
//   }
//   res.render('signUp');
// });

module.exports = router;