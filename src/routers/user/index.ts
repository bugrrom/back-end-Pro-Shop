// Core
import * as express from 'express';
import {
  createUser,
  Login,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  removeUser,
  updateEditProfileById, getUserById,
} from './route';

// Helpers
import { authenticate, limiter, validator } from '../../helpers';
// Schema
import { createUsers, login } from '../../schema';
import { admin } from '../../helpers/admin';

export const router = express.Router();

router.post('/create', [validator(createUsers)], createUser);
router.post('/login', [validator(login)], Login);
router.get('/profile', [authenticate], getUserProfile);
router.put('/updateUser', [authenticate, limiter(1000, 1000 * 3)], updateUserProfile);
router.get('/users', [authenticate, admin], getAllUsers);
router.get('/:id', [authenticate, admin], getUserById);
router.delete('/remove', [authenticate, admin], removeUser);
router.put('/updateUser/:id', [authenticate, admin], updateEditProfileById);

export { router as user };
