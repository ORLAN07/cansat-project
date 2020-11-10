const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
bodyParser = require('body-parser');
const dataFile = require('./data');

const port = 9000;


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}, bodyParser.json());

app.get('/api/cansat', (req, res) => {
    res.send(dataFile.getMiners());
});

app.post('/api/cansat/altitude', (req, res) => {
    console.log('request>body>', req.body);
    let altitude = dataFile.addNewValueAltitude(req.body.x, req.body.y);
    console.log('altitudeSEND>>>', altitude.altitude.values);
    io.sockets.emit('message', altitude);
});

app.post('/api/cansat/vibration', (req, res) => {
    console.log('request>body>', req.body);
    let altitude = dataFile.addNewValueVibration(req.body.x, req.body.y);
    console.log('altitudeSEND>>>', altitude.altitude.values);
    io.sockets.emit('message', altitude);
});

app.post('/api/cansat/temperature', (req, res) => {
    console.log('request>body>', req.body);
    let temperature = dataFile.addNewValueTemperature(req.body.x, req.body.y);
    console.log('altitudeSEND>>>', temperature.temperature.values);
    io.sockets.emit('message', temperature);
});

app.post('/api/cansat/atmosphericPressure', (req, res) => {
    console.log('request>body>', req.body);
    let atmosphericPressure = dataFile.addNewValueAtmosphericPressure(req.body.x, req.body.y);
    console.log('altitudeSEND>>>', atmosphericPressure.atmosphericPressure.values);
    io.sockets.emit('message', atmosphericPressure);
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


