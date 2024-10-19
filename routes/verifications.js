const express = require('express');
const router = express.Router();
const Verification = require('../models/verification');

router.get('/', async (req, res, next) => {
  try {
    const verifications = await Verification.findAll();
    res.render('verifications/index', { verifications });
  } catch (error) {
    res.status(500).send('Error fetching verifications');
  }
});

router.post('/', async (req, res, next) => {
  const { identifier } = req.body;

  try {
    const verification = await Verification.create({
      identifier,
      result: null,
    });

    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error creating verification');
  }
});

module.exports = router;
