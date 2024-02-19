const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Notification } = require('../../models');


router.post('/', withAuth ,async (req, res) => {
  console.log('Received request body:', req.body); 

  try {
      const { title, message, notificationType, associatedDate, notificationColor, notificationIcon } = req.body;
      const user_id = req.session.user_id; 

      console.log('Destructured values:', { title, message, notificationType, associatedDate, notificationColor, notificationIcon, user_id });

      if (!user_id) {
          
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
          user_id 
      });

      console.log('Created notification:', newNotification); 
      
      res.status(201).json(newNotification);
  } catch (error) {
      console.error('Error creating notification:', error);
      res.status(500).json({ message: 'Internal server error', error: error.toString() });
  }
});





router.get('/', withAuth, async (req, res) => {
  try {
      const user_id = req.session.user_id ; 
      const notifications = await Notification.findAll({
          where: { user_id: user_id }
      });
      res.json(notifications); 
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
    res.json({
      loggedIn: true,
      user_id: 1,
    });
  } else {
    res.json({ loggedIn: false });
  }
});


module.exports = router;

