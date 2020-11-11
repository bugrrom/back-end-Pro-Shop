// Core
import * as dg from 'debug';

import { app } from './server';

const port = process.env.PORT;
const debugSrv = dg('server:main');

app.listen(port, () => {
  debugSrv(`Server API is up on port ${port}`);
});
