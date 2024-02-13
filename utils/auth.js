/*
const withAuth = (req, res, next) => {
  // Check if the user is logged in and the user_id is present
  if (!req.session.logged_in || !req.session.user_id) {
      // If not, redirect to the login page
      res.redirect('/login');
  } else {
      // If logged in and user_id is present, proceed to the next middleware/route handler
      next();
  }
};
*/
const withAuth = (req, res, next) => {
  if (!req.session.logged_in || !req.session.user_id) {
    if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
      // Handle AJAX request
      res.status(401).json({ message: 'Not authorized' });
    } else {
      // Handle direct navigation
      res.redirect('/login');
    }
  } else {
    next();
  }
};




/*
const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  */
module.exports = withAuth;
