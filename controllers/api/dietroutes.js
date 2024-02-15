const router = require('express').Router();
const { Diet } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all diets and JOIN with user data
    const dietData = await Diet.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });


// Serialize data so the template can read it
const diets = dietData.map((diet) => diet.get({ plain: true }));

// Pass serialized data and session flag into template
res.render('mydiet',{ layout: false,
  diets,
  logged_in: req.session.logged_in 
});
} catch (err) {
res.status(500).json(err);
}
});

//GET request for all diets
router.get('/', (req,res) => {
    Diet.findAll({})
    .then(dietData => res.json(dietData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});
// // GET request by id
// router.get('/:id', (req, res) => {
//     Diet.findAll({
//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(DietData => res.json(DietData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         })
// });

//POST request for new diet
router.post('/', async (req, res) => {
  try {
    const newDiet = await Diet.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(newDiet);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELTE request by id 
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dietData = await Diet.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    //If request is succesfull, the id should not be found
    if (!dietData) {
      res.status(404).json({ message: 'Diet ID not found' });
      return;
    }
    res.status(200).json(dietData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;