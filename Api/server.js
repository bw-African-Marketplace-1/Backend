const express = require('express');
const authRouter = require('../Auth/auth-router.js');
const businessRouter = require('../Api/businessRouter.js');
const itemsRouter = require('../Api/forSaleRouter.js')
const helmet = require('helmet');
const cors = require('cors');

const server = express();
// server.use(helmet());
// server.use(cors());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/business', businessRouter)
server.use('/api/forsale', itemsRouter)

module.exports = server;
