const express = require('express');
const router = express.Router();
const Verification = require('../models/verification');
const Verificator = require('../services/verificator');

router.get('/', async (req, res, next) => {
  try {
    const verifications = await Verification.findAll();
    res.render('verifications/index', {verifications: verifications.reverse()});
  } catch (error) {
    res.status(500).send('Error fetching verifications');
  }
});

router.post('/', async (req, res, next) => {
  const { identifier } = req.body;

  try {
    const verification = await Verificator.verify(identifier);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Verification failed with error: ' + error.message);
  }
});

module.exports = router;
