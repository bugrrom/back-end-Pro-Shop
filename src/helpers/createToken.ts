import * as jwt from 'jsonwebtoken';
import { getPassword } from './env';

export const createToken = (id: string) => jwt.sign({ id }, getPassword(), { expiresIn: '8d' });
