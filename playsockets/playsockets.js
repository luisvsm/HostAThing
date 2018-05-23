var io;
var app;

module.exports = {
    start: function(app) {
        var app = require('http').createServer()
        var io = require('socket.io')(app);

        app.listen(3001);
        function handler (req, res) {}

        io.on('connection', function (socket) {
            console.log("connected");
            socket.emit('news', { hello: 'world' });
            socket.on('my other event', function (data) {
                console.log(data);
            });
        });
    }
  };