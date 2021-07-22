import {
  describe,
  it,
  before
} from 'mocha';
import { expect } from 'chai/index';
import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';

import clearCollections from '../../utils/clear.collections';
import { createDefaultUser, createUserObject, loginUserAgent } from '../../utils/init.data.user';

let agent;

let userObj;

let defaultUser;

describe('GET api/user/:id', function () {
  before(async () => {
    await clearCollections();

    userObj = createUserObject();

    defaultUser = await createDefaultUser(userObj);

    agent = await loginUserAgent(userObj);
  });

  it('should return status NOT FOUND, because user with same id was not created.', async () => {
    const id = mongoose.Types.ObjectId();

    await agent
      .get(`/api/user/${id}`)
      .send()
      .expect(httpStatus.NOT_FOUND);
  });

  it('should return status OK and user object.', async () => {
    const res = await agent
      .get(`/api/user/${defaultUser._id}`)
      .send()
      .expect(httpStatus.OK);

    expect(res.body).to.be.an('object');
    expect(res.body).has.own.property('name').eq(defaultUser.name);
    expect(res.body).has.own.property('email').eq(defaultUser.email);
  });
});
