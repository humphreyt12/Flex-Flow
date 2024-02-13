const router = require('express').Router();
const { notifications } = require('models');

router.get('/', async (req, res) => {
  try {
    const notificationsData = await notifications.findAll();
    res.status(200).json(notificationsData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const notificationsData = await notifications.findByPk(req.params.id);

    if (!notificationsData) {
      res.status(404).json({ message: 'No notification available' });
      return;
    }

    res.status(200).json(notificationsData);
 {
    // for displaying a singular notifications
 }} catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const notificationsData = await notifications.create(req.body);
    res.status(200).json(notificationsData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const notificationsData = await notifications.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!notificationsData) {
      res.status(404).json({ message: 'No notifications found with this id!' });
      return;
    }

    res.status(200).json(notificationsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
