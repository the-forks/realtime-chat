const route = require('express').Router();
const path = require('path');

route.get('/', function (req, res) {
    res.sendFile('Hello. This static REST.')
});

route.use('/user', require('./controllers/user'));

module.exports = route;