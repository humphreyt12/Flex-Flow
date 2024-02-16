const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Notification } = require('../../models');

//console.log(req.session)

router.post('/', withAuth ,async (req, res) => {
  console.log('Received request body:', req.body); // Log the incoming request body

  try {
      const { title, message, notificationType, associatedDate, notificationColor, notificationIcon } = req.body;
      const user_id = req.session.user_id; // Get the user_id from the session

      // Debugging: Log the values to ensure they are received correctly
      console.log('Destructured values:', { title, message, notificationType, associatedDate, notificationColor, notificationIcon, user_id });

      if (!user_id) {
          // If there's no user_id in the session, respond with an error or prompt the user to log in
          return res.status(403).json({ message: "User not logged in." });
      }

      const newNotification = await Notification.create({
          title,
          message,
          notificationType,
          dayOfWeek: notificationType === 'specificDay' ? associatedDate : null,
          specificDate: notificationType === 'specificDate' ? associatedDate : null,
          notificationColor,
          notificationIcon,
          user_id // Associate the new notification with the logged-in user
      });

      console.log('Created notification:', newNotification); // Log the newly created notification object
      
      res.status(201).json(newNotification);
  } catch (error) {
      console.error('Error creating notification:', error);
      res.status(500).json({ message: 'Internal server error', error: error.toString() });
  }
});





router.get("/", withAuth, async (req, res) => {
  try {
      const user_id = req.session.user_id; // Assuming user_id is stored in the session upon login
      const notifications = await Notification.findAll({
          where: { user_id: user_id }
      });
      res.json(notifications); // Send the notifications as JSON
  } catch (error) {
      console.error('Failed to fetch notifications:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

router.put("/:id", withAuth , async (req, res) => {
  const { id } = req.params;
  const {
    title,
    message,
    notificationType,
    dayOfWeek,
    specificDate,
    notificationColor,
    notificationIcon,
  } = req.body;

  try {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Update based on notificationType
    // You might adjust dayOfWeek and specificDate based on the notificationType here
    await notification.update({
      title,
      message,
      notificationType,
      dayOfWeek: notificationType === "specificDay" ? dayOfWeek : null,
      specificDate: notificationType === "specificDate" ? specificDate : null,
      notificationColor,
      notificationIcon,
    });

    res.json({ message: "Notification updated successfully", notification });
  } catch (error) {
    console.error("Failed to update notification:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.toString() });
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const notificationData = await Notification.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!notificationData) {
      res.status(404).json({ message: "No notifications found with this id!" });
      return;
    }
    res.status(200).json(notificationData);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/api/session', withAuth , (req, res) => {
  if (req.session.logged_in) {
    // If the user is logged in, respond with their session info
    res.json({
      loggedIn: true,
      user_id: 1,
      // You can add more session-related data here if needed
    });
  } else {
    // If the user is not logged in, indicate that in the response
    res.json({ loggedIn: false });
  }
});


module.exports = router;