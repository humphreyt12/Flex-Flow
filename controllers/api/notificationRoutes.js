const router = require('express').Router();
const express = require('express')
const withAuth = require('../../utils/auth');
const { Notification } = require('../../models');

router.use(express.json())

router.get('/notifications',withAuth, async (req, res) => {
  try {
    // Assuming user_id is stored in req.session
    const userId = req.session.userId; // Adjust based on your authentication setup

    const notificationData = await Notification.findAll({
      where: {
        userId: userId, // Filter notifications by the logged-in user's ID
      },
    });

    res.status(200).json(notificationData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/notifications/:id', async (req, res) => {
  const {id} = req.params;
  const { title, message,onReopen, specificDay, specificDate, dayOfWeek, CalendarDate, notificatioColor, notificationIcon} = req.body

  try {
    const notification = await Notification.findByPk(id);
    if (notification) {
        // Update the notification with new values
        const updatedNotification = await notification.update({
            title,
            message,
            ...otherFields
        });
        res.json(updatedNotification);
    } else {
        res.status(404).json({ message: 'Notification not found' });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating notification' });
}
});



router.delete('/notification/:id', withAuth, async (req, res) => {
  try {
    const notificationData = await Notification.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
    });
    if (!notificationData) {
      res.status(404).json({ message: 'No notifications found with this id!' });
      return;
    }
    res.status(200).json(notificationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
