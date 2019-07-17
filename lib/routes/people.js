const { Router } = require('express');
const Person = require('../models/Person');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name, 
      city,
      state,
      profileImage,
      email
    } = req.body;

    Person
      .create({
        name,
        city,
        state,
        profileImage,
        email
      })
      .then(person => res.send(person))
      .catch(next);
  });
