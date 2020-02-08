import express from 'express';
import helmet from 'helmet';

import fruitsRouter from '../fruits/router.js';

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/fruits', fruitsRouter);

server.use('/*', (req, res) => {
  return res.status(404).json({ error: 'Path not found' });
})

server.use((err, req, res, next) => {
  return res.status(500).json({ err });
})
export default server;
