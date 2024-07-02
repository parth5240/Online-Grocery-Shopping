const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, address, mobileNumber } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password, email, address, mobileNumber });
    await newUser.save();

    // Automatically log in the newly registered user
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in after registration' });
      }
      res.status(201).json(newUser);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  // If passport.authenticate succeeds, this function will be called
  res.json(req.user);
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
