const router = require('express').Router();
const { User } = require('../../models');
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post('/login', async (req, res) => {
    console.log('Login attempt received', req.body); // Log the incoming request body to see what username/password is being attempted.
  
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });
      console.log('User lookup:', userData ? 'User found' : 'User not found'); // Log whether the user was found.
  
      if (!userData) {
        console.log('No user data found for username:', req.body.username); // More specific log if user not found.
        res.status(400).json({ message: 'Account not found, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
      console.log('Password check:', validPassword ? 'Valid password' : 'Invalid password'); // Log the result of the password check.
  
      if (!validPassword) {
        console.log('Invalid password for username:', req.body.username); // More specific log if password check fails.
        res.status(400).json({ message: 'Invalid password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        console.log('Login successful for user:', req.body.username); // Log successful login.
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      console.error('Login error:', err); // Log any errors that occur during the login process.
      res.status(500).json({ message: 'Error logging in', error: err.message });
    }
  });
  
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;