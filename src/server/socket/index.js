const getName = require('../helpers/getUsername');

exports = module.exports = function (io) {

    io.on('connection', function (socket) {
        socket.emit('user joined', getName())

        socket.on('client:joined', function (data) {
            io.emit('server:message', data);
        })

        socket.on('client:message', function (data) {
            io.emit('server:message', data);
        })

    })

}