'use strict';

const express = require('express');
const ApiController = require('./src/server');
const cors = require('cors');
const config = require('./src/config');
const path = require('path');

const app = express();
app.use(cors());

app.use(express.static(path.resolve(__dirname, 'public')))
app.use('/api', require('./src/server'));

const server = require('http').Server(app);
const io = require('socket.io')(server);

require('./src/server/socket')(io);


server.listen(config.api.port, config.api.host, () => {
    console.log('Application running on', server.address());
});