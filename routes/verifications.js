const express = require('express');
const router = express.Router();
const db = require('../db/conn');

router.get('/', function (req, res) {
  res.render('verifications/index', {
    title: 'External Verifications',
    verifications: []
  });
});

router.post('/', function (req, res, next) {
  const { identifier, result } = req.body;

  if (!identifier) {
    return res.status(422)
      .render('verifications/index', {
        title: 'External Verifications',
        verifications: [],
        error: 'Identifier is required'
      });
  }

  const query = `
    INSERT INTO verifications (identifier, result)
    VALUES (?, ?)
  `;

  db.run(query, [identifier, result], function(err) {
    if (err) {
      console.error('Error inserting data:', err.message);
      return res.status(500).send('Internal Server Error');
    }

    // Successfully inserted, respond with the ID of the new row
    res.send(`Verification added with ID: ${this.lastID}`);
  });
});

module.exports = router;
