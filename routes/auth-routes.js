const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();
const config = require('config');

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Не коректний e-mail').isEmail(),
    check('password', 'Мінімальна довжина паролю 6 символів').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Не коректні дані при реєстрації',
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'Такий користувач вже існує' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: 'Користувач створений успішно' });
    } catch (error) {
      res.status(500).json({ message: 'Шось пішло не так, попробуйте знову' });
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Не коректний e-mail')
      .normalizeEmail()
      .isEmail(),
    check('password', 'Введіть пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Не коректні дані при вході в систему',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: 'Користувача з даним e-mail не знайдено' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Пароль неправильний, попробуйте знову' });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.get('jwtSecret'),
        {
          expiresIn: '1h',
        }
      );

      res.status(200).json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: 'Шось пішло не так, попробуйте знову' });
    }
  }
);

module.exports = router;
