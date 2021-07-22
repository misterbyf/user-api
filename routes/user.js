import express from 'express';

import middlewarePassportJwt from '../middleware/middleware.passport.jwt';
import middlewareValidator from '../middleware/middleware.validator';
import middlewareACL from '../middleware/middleware.acl';
import { upload } from '../middleware/upload.file';

import { updateUser, getUser } from '../controllers/user.controller';
import { getUserSchema, updateUserSchema } from '../middleware/schemas.for.validation/user.schema';

const router = express.Router();

router.route('/:id')
  .get(middlewarePassportJwt, middlewareACL('admin', 'user'), middlewareValidator(getUserSchema), getUser)
  .put(
    middlewarePassportJwt,
    middlewareACL('admin', 'user'),
    middlewareValidator(updateUserSchema),
    upload.single('photo'),
    updateUser
  );

export default router;
