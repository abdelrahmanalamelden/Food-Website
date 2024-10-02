// models/Meal.js
const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  chef: {
    type: String,
    required: true, // this can be changed later to reference a Chef model
  },
});

module.exports = mongoose.model('Meal', mealSchema);
