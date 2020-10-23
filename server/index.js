const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const dataFile = require('./data');

const port = 9000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/cansat', (req, res) => {
    res.send(dataFile.getMiners());
});

http.listen(port, () => {
    console.log(`Listening on *:${port}`);
});

setInterval(function () {
    dataFile.updateValues()
    const data = dataFile.getLatest();
    io.sockets.emit('message', data);
    // if(miners.validateMinerOneLength()) {
    //   throw new Error('Forced Error');
    // }
}, 500);

io.on('connection', function (socket) {
    console.log(`A user connected: ${socket.id}`);
});


