// routes/mealRoutes.js
const express = require('express');
const Meal = require('../models/Meal');
const router = express.Router();

// Get all meals
router.get('/', async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new meal
router.post('/', async (req, res) => {
  const meal = new Meal({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    chef: req.body.chef,
  });

  try {
    const newMeal = await meal.save();
    res.status(201).json(newMeal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a meal
router.delete('/:id', async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });

    await meal.remove();
    res.json({ message: 'Meal deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
