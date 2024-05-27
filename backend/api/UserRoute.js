const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userExists = async (email) => {
  const user = await User.findOne({ email: email.toLowerCase().trim() });
  return !!user;
};

// Register
router.post('/register', async (req, res) => {
  try {
    if (await userExists(req.body.email)) {
      return res.status(409).json({ error: 'Email already exists!' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'Incorrect email or password!' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Incorrect email or password!' });
    }

    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
