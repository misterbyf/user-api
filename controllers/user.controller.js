import httpStatus from 'http-status-codes';

import User from '../models/User';

/**
 * GET /api/user/:id
 * */
async function getUser(req, res, next) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          message: 'User does not exist.'
        });
    }

    return res
      .json(user);
  } catch (error) {
    return next(error);
  }
}

/**
 * PUT /api/user/:id
 * */
async function updateUser(req, res, next) {
  try {
    const { id } = req.params;

    const { name, email, password } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          message: 'User does not exist.'
        });
    }

    const validEmail = await User.findOne({ email }).lean();

    if (validEmail) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({
          message: 'User with same email already exist.'
        });
    }

    Object.assign(user, { name, email, password });

    user.save();

    return res
      .json(user);
  } catch (error) {
    return next(error);
  }
}

export {
  getUser,
  updateUser
};
