const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  city: String, 
  state: String, 
  profileImage: String, 
  email: {
    type: String,
    required: true
  }
});

const Person = new mongoose.Model('Person', personSchema);

module.exports = Person;
