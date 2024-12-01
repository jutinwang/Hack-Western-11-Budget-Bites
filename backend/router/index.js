const express = require('express');
const router = express.Router();
const meals = require('../database/meals.json');

router.post('/meals', async (req, res) => {
  try {
    const { budget, category } = req.body;
    const filteredMeals = meals.filter(meal => meal.price_range <= budget && meal.category === category);
    res.json(filteredMeals);
  } catch (error) {
    console.error(error)
  }
});


module.exports = router;