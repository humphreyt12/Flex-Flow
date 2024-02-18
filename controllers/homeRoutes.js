const router = require('express').Router();
const { Diet, User, Workout, Notification } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});



// Use withAuth middleware to prevent access to route
router.get('/homepage', withAuth, async (req, res) => {
  console.log('Accessing /homepage route'); // Log when route is accessed

  try {
    console.log('Session User ID:', req.session.user_id); // Log the session user ID to verify it exists

    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{model:Workout}, {model:Diet}]
    });

    if (!userData) {
      console.log('No user data found for session ID:', req.session.user_id); // Log if no user data is found
      res.status(404).send('User not found');
      return;
    }

    const user = userData.get({ plain: true });
    console.log('User data for homepage:', user); // Log the user data being passed to the template

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
  res.render('signup'); 
});

router.get('/help', (req, res) => {
  console.log('About to render help');
  res.render('help'); 
});

router.get('/myworkouts', withAuth, async (req, res) => {
  console.log('Accessing /myworkouts route'); 
  
  try {
    console.log('Session User ID:', req.session.user_id); // Log session user ID
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Workout }],
    });
    console.log('User Data before rendering template:', userData); // Log user data before rendering template


    if (!userData) {
      console.log('No user data found'); // Log if user data is not found
      res.render('myworkouts', {
        logged_in: true,
        user: null // Pass null user data to template
      });
      return;
    }

    console.log('Response Data:', {
      user: userData.get({ plain: true }),
      logged_in: true
    });

    const user = userData.get({ plain: true });
    console.log('User Data for myworkouts:', user); // Log user data
    
    res.render('myworkouts', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error('Error fetching user data:', err); // Log any errors
    res.status(500).json(err);
  }
});



router.get('/mydiets', withAuth, async (req, res) => {
  console.log('Accessing /mydiets route'); // Log when route is accessed
  
  try {
    console.log('Session User ID:', req.session.user_id); // Log session user ID
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Diet }],
    });
    console.log('User Data before rendering template:', userData); // Log user data before rendering template


    if (!userData) {
      console.log('No user data found'); // Log if user data is not found
      res.render('mydiets', {
        logged_in: true,
        user: null // Pass null user data to template
      });
      return;
    }

    console.log('Response Data:', {
      user: userData.get({ plain: true }),
      logged_in: true
    });

    const user = userData.get({ plain: true });
    console.log('User Data for mydiets:', user); // Log user data
    
    res.render('mydiets', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error('Error fetching user data:', err); // Log any errors
    res.status(500).json(err);
  }
});

router.get('/methods', (req, res) => {
  console.log('About to render methods');
  res.render('methods'); 
});

router.get('/dietplans', (req, res) => {
  console.log('About to render dietplans');
  res.render('dietplans'); 
});


router.get('/mynotifications', (req, res) => {
  console.log('About to render notifications');
  res.render('mynotifications'); 
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

module.exports = router;