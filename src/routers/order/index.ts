// Core
import * as express from 'express';

// Helpers
import { authenticate } from '../../helpers';
import {
  addOrderItems, getAdminAllOrder, getAllOrder, getOrder,
} from './route';
import { admin } from '../../helpers/admin';
// Schema

const router = express.Router();

router.get('/all', [authenticate, admin], getAdminAllOrder);
router.get('/:id', [authenticate], getOrder);
router.post('/', [authenticate], addOrderItems);
router.get('/', [authenticate], getAllOrder);

export { router as order };
