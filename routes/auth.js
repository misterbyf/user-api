import express from 'express';

import middlewareValidator from '../middleware/middleware.validator';
import middlewarePassportJwt from '../middleware/middleware.passport.jwt';

import { loginSchema, registerSchema } from '../middleware/schemas.for.validation/auth.schema';
import {
  login,
  logout,
  register
} from '../controllers/auth.controller';

const router = express.Router();

router.route('/login')
    .post(middlewareValidator(loginSchema), login);

router.route('/register')
    .post(middlewareValidator(registerSchema), register);

router.get('/logout', middlewarePassportJwt, logout);

export default router;
