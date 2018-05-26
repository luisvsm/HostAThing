var io;
var app;
var switchStates = {};
module.exports = {
    start: function(app) {
        var app = require('http').createServer()
        var io = require('socket.io')(app);

        app.listen(3001);
        function handler (req, res) {}

        io.on('connection', function (socket) {
            console.log("connected");

  
            socket.join('switchRoom');
            socket.on('switch', function (data) {
                newState = JSON.parse(data);
                stateData = JSON.parse(newState.p);
                switchStates[stateData.id] = data;
                io.to('switchRoom').emit('switch', data);
            });
            var switches = Object.keys(switchStates);
            for (var i = 0; i < switches.length; i++) {
                socket.emit('switch', switchStates[switches[i]]);
            }
        });
    }
  };