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
  })
  .get('/', (req, res, next) => {
    Person
      .find()
      .then(people => res.send(people))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Person
      .findById(req.params.id)
      .then(person => res.send(person))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const {
      city,
      state,
      profileImage
    } = req.body;

    Person
      .findByIdAndUpdate(req.params.id, {  
        city,
        state,
        profileImage
      }, { new: true })
      .then(person => res.send(person))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Person
      .findByIdAndDelete(req.params.id)
      .then(person => res.send(person))
      .catch(next);
  });

