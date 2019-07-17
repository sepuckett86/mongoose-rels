require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('people routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('posts a person', () => {
    const person = {
      name: 'Susan',
      email: 'myemail@susan.com'
    };

    return request(app)
      .post('/api/v1/people')
      .send(person)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Susan',
          email: 'myemail@susan.com',
          __v: 0
        });
      });
  });
});
