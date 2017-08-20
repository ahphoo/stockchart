/**
 * Main file for stocks app 
 */

let express = require('express');
let http = require('http');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let config = require('./config/environment');

// Connect to MongoDB
mongoose.connect(config.mongo.url, config.mongo.options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error'));
db.once('open', () => console.log('mongodb connected'));

// Setup server
let app = express();
let server = http.createServer(app);
//If value is true the attached server will serve the client files
let socketio = require('socket.io')(server, {
    // serveClient: config.env !== 'production'
  path: '/stockchart'
});
require('./config/socketio')(socketio);
require('./config/expres')(app);
require('./routes')(app);

// Start server
const startServer = () => {
    server.listen(config.port, config.ip, () => {
        console.log('Express server listening on %d, in %s mode', config.port,
          app.get('env'));
        });
});

setImmediate(startServer);

//Export app
exports = module.exports = app;
