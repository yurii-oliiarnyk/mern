const { Router } = require('express');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post('/generate', auth, async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: 'Шось пішло не так, попробуйте знову' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Шось пішло не так, попробуйте знову' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const link = await Link.findById({ owner: req.params.id });
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: 'Шось пішло не так, попробуйте знову' });
  }
});

module.exports = router;
