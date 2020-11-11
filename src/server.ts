// Core
import * as express from 'express';
import {
  Application,
} from 'express';
import * as bodyParser from 'body-parser';
import * as dg from 'debug';
import * as path from 'path';
import * as cors from 'cors';
import * as helmet from 'helmet';
// Routes
import { product } from './routers/product';
import { user } from './routers/user';
import { order } from './routers/order';
import { upload } from './routers/upload';
// Helpers
import { NotFoundError } from './helpers/errors';
// Initialize DB connection
import './db';
// Initialize app
const app: Application = express();

const debug = dg('server:init');

app.use(helmet());
app.use(cors());

app.use(
  bodyParser.json({
    limit: '5kb',

  }),
);

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    const body = req.method === 'GET'
      ? 'Body not supported for GET'
      : JSON.stringify(req.body, null, 2);

    debug(`${req.method}\n${body}`);
    next();
  });
}

app.get('/', (req, res) => {
  res.status(200).send('welcome!');
});
app.use('/api/product', product);
app.use('/api/user', user);
app.use('/api/order', order);
app.use('/api/upload', upload);
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('*', (req, res, next) => {
  const error = new NotFoundError(
    `Can not find right route for method ${req.method} and path ${req.originalUrl}`,
    404,
  );
  next(error);
});

export { app };
