require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Person = require('../lib/models/Person');

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

  it('posts a full person', () => {
    const person = {
      name: 'Susan',
      city: 'Utrecht',
      state: 'Utrecht',
      profileImage: 'myImage',
      email: 'myemail@susan.com'
    };

    return request(app)
      .post('/api/v1/people')
      .send(person)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Susan',
          city: 'Utrecht',
          state: 'Utrecht',
          profileImage: 'myImage',
          email: 'myemail@susan.com',
          __v: 0
        });
      });
  });

  it('gets people', async() => {
    const person = await Person.create({
      name: 'Susan',
      city: 'Utrecht',
      state: 'Utrecht',
      profileImage: 'myImage',
      email: 'myemail@susan.com'
    });

    return request(app)
      .get('/api/v1/people')
      .then(res => {
        const personJSON = JSON.parse(JSON.stringify(person));
        expect(res.body).toEqual([personJSON]);
      });
  });

  it('gets person by id', async() => {
    const person = await Person.create({
      name: 'Susan',
      city: 'Utrecht',
      state: 'Utrecht',
      profileImage: 'myImage',
      email: 'myemail@susan.com'
    });
    
    return request(app)
      .get(`/api/v1/people/${person._id}`)
      .then(res => {
        const personJSON = JSON.parse(JSON.stringify(person));
        expect(res.body).toEqual(personJSON);
      });
  });
  it('patches person by id', async() => {
    const person = await Person.create({
      name: 'Susan',
      city: 'Utrecht',
      state: 'Utrecht',
      profileImage: 'myImage',
      email: 'myemail@susan.com'
    });
    
    return request(app)
      .patch(`/api/v1/people/${person._id}`)
      .send({ city: 'Portland', state: 'Oregon' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Susan',
          city: 'Portland',
          state: 'Oregon',
          profileImage: 'myImage',
          email: 'myemail@susan.com',
          __v: 0
        });
      });
  });
});
