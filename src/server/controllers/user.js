const route = require('express').Router();

route.get('/', function (req, res) {
    res.send('You are not allot to preview this content.')
});

module.exports = route;