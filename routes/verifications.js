const express = require('express');
const router = express.Router();
const Verification = require('../models/verification');
const Verificator = require('../services/verificator');

router.get('/', async (req, res, _next) => {
  try {
    const verifications = await Verification.findAll();
    res.render('verifications/index', {verifications: verifications.reverse()});
  } catch (error) {
    res.status(500).send('Failed to fetch verifications:', error);
  }
});

router.get('/verify/:id', async (req, res, _next) => {
  const { id } = req.params;

  try {
    const verification = await Verification.findByPk(id);
    res.render('verifications/verify', {verification});
  } catch (error) {
    res.status(500).send('Failed to fetch verification:', error);
  }
});

router.post('/verify/:id', async (req, res, _next) => {
  const { id } = req.params;
  const { captcha } = req.body;

  try {
    const verification = await Verification.findByPk(id);
    const result = await Verificator.verify(verification, captcha);
    console.log('Verification result:', result);
    res.redirect('/verify/' + id);
  } catch (error) {
    res.status(500).send('Verification failed with error: ' + error.message);
  }
});

router.post('/', async (req, res, _next) => {
  const { identifier } = req.body;

  try {
    const verification = await Verificator.startVerification(identifier);
    console.log('Verification started:', verification.id);
    res.redirect('/verify/' + verification.id);
  } catch (error) {
    res.status(500).send('Verification failed with error: ' + error.message);
  }
});

module.exports = router;
