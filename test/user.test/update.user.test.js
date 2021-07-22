import {
  describe,
  it,
  before
} from 'mocha';
import { expect } from 'chai/index';
import httpStatus from 'http-status-codes';
import faker from 'faker';
import mongoose from 'mongoose';

import clearCollections from '../../utils/clear.collections';
import { createDefaultUser, createUserObject, loginUserAgent } from '../../utils/init.data.user';

let agent;

let userObj;

let defaultUser;

describe('PUT api/user/:id', function () {
  before(async () => {
    await clearCollections();

    userObj = createUserObject();

    defaultUser = await createDefaultUser(userObj);

    agent = await loginUserAgent(userObj);
  });

  it('should return status BAD REQUEST, because user was not created', async () => {
    const id = mongoose.Types.ObjectId();

    const updateUser = createUserObject({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    await agent
      .put(`/api/user/${id}`)
      .send(updateUser)
      .expect(httpStatus.NOT_FOUND);
  });

  it('should return status BAD REQUEST, because with same email already exist.', async () => {
    const updateUser = createUserObject({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    await agent
      .put(`/api/user/${defaultUser._id}`)
      .send(Object.assign(updateUser, { email: defaultUser.email }))
      .expect(httpStatus.BAD_REQUEST);
  });

  it('should return status OK, and updated user object.', async () => {
    const updateUser = createUserObject({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    const res = await agent
      .put(`/api/user/${defaultUser._id}`)
      .send(updateUser)
      .expect(httpStatus.OK);

    expect(res.body).to.be.an('object');
    expect(res.body).has.own.property('name').eq(updateUser.name);
    expect(res.body).has.own.property('email').eq(updateUser.email);
  });
});
