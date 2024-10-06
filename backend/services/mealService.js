const slugify = require('slugify');
const asyncHandler = require('express-async-handler');

const Meal = require('../models/mealModel');

// @desc    Get list of meals
// @route   GET /api/v1/meals
// @access  Public
exports.getmeals = asyncHandler(async (req, res) => {
  const meals = await Meal.find({});
  res.status(200).json({ results: meals.length, data: meals });
});

// @desc    Get specific meal by id
// @route   GET /api/v1/meals/:id
// @access  Public
exports.getmeal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const meal = await Meal.findById(id);
  if (!meal) {
    res.status(404).json({ msg: `No meal for this id ${id}` });
  }
  res.status(200).json({ data: meal });
});

// @desc    Create meal
// @route   POST  /api/v1/meals
// @access  Private
exports.createmeal = asyncHandler(async (req, res) => {
  console.log(req.body);
  const meal = await Meal.create(req.body);
  res.status(201).json({ data: meal });
});

// @desc    Update specific meal
// @route   PUT /api/v1/meals/:id
// @access  Private
exports.updatemeal = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const meal = await Meal.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!meal) {
    res.status(404).json({ msg: `No meal for this id ${id}` });
  }
  res.status(200).json({ data: meal });
});

// @desc    Delete specific meal
// @route   DELETE /api/v1/meals/:id
// @access  Private
exports.deletemeal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const meal = await Meal.findByIdAndDelete(id);

  if (!meal) {
    res.status(404).json({ msg: `No meal for this id ${id}` });
  }
  res.status(204).send();
});
