const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config({ path: 'config.env' });
const dbConnection = require('./config/database');
const mealRoute = require('./routes/mealRoute');

const authRoute = require('./routes/authRoute');

// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

// Enable other domains to access your application
app.use(cors());
app.options('*', cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/meals', mealRoute);
app.use('/api/v1/auth', authRoute);

// Error Handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
