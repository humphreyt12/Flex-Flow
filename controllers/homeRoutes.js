const router = require('express').Router();
const { Diet, User, Workout } = require('../models');
const withAuth = require('../utils/auth');

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

// Use withAuth middleware to prevent access to route
router.get('/homepage', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Workout }],
    });

    const user = userData.get({ plain: true });

    //Creating the dashboard
    res.render('homepage', {
      layout: false,
      ...user, // Spread operator to pass user object properties as separate properties
      logged_in: logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  console.log('About to render signup');
  res.render('signup', { layout: false }); // Example without using a layout
});




// router.get('/signup', (req, res) => {
//   console.log('Accessing the signup route');
//   res.render('signup', {}, (err, html) => {
//     if (err) {
//       console.log('Error rendering signup:', err);
//       // Ensure we stop execution and properly handle the error
//       return res.status(500).send('An error occurred');
//     }
//     console.log('Signup page rendered successfully');
//     // If no error, send the rendered HTML
//     res.send(html);
//   });
//   // Remove or comment out the incorrect second render
//   // res.render('signup');
// });

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