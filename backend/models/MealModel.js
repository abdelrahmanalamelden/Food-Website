const mongoose = require('mongoose');
// 1- Create Schema

const mealSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
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

// 2- Create model
const mealModel = mongoose.model('Meal', mealSchema);

module.exports = mealModel;
