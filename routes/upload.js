import express from 'express';

import middlewarePassportJwt from '../middleware/middleware.passport.jwt';
import middlewareFileError from '../middleware/middleware.file.error';
import middlewareValidator from '../middleware/middleware.validator';
import middlewareACL from '../middleware/middleware.acl';
import { upload } from '../middleware/upload.file';

import { load } from '../controllers/upload.conroller';

const router = express.Router();

router.route('/:id')
  .put(
    middlewarePassportJwt,
    middlewareACL('admin', 'user'),
    upload.single('photo'),
    middlewareFileError(),
    load
  );

export default router;
