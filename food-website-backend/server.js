// Load environment variables
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mealRoutes = require('./routes/mealRoutes');
const port = 7000;
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Middleware
app.use(express.json()); // for parsing application/json

// Routes
app.use('/api/meals', mealRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log(`MongoDB connected with HOST: ${conn.connection.host}`);
  })
  .catch((err) => {
    console.log(`Database Error : ${err}`);
    process.exit(1);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// User Model
const User = require('./models/User'); // Create a User model in ./models/User.js

// Registration route
app.post(
  '/api/register',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({ email, password });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return JWT
      const payload = { user: { id: user.id } };
      jwt.sign(payload, 'secretToken', { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

// Login route
app.post(
  '/api/login',
  [body('email').isEmail(), body('password').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Return JWT
      const payload = { user: { id: user.id } };
      jwt.sign(payload, 'secretToken', { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);
// const port = 27017;

// // Middleware to parse JSON requests
// app.use(express.json());

// // Connect to MongoDB
// mongoose
//   .connect('mongodb://localhost:27017/')
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Simple test route
// app.get('/', (req, res) => {
//   res.send('Welcome to the food website API');
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
