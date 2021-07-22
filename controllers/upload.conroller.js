import sharp from 'sharp';
import httpStatus from 'http-status-codes';

import User from '../models/User';

/**
 * PUT /api/user/:id
 * */
async function load(req, res, next) {
  try {
    const { id } = req.params;

    const { path: photo } = req.file;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          message: 'User does not exist.'
        });
    }

    await sharp(photo)
      .resize(200, 200)
      .jpeg({ quality: 90 });

    Object.assign(user, { photo });

    user.save();

    return res
      .json(user);
  } catch (error) {
    return next(error);
  }
}

export {
  load
};