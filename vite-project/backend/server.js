// server.js
const http = require('http');
const app = require('./index');
const initSocket = require('./utils/socket');

const server = http.createServer(app);
const io = initSocket(server);

global.io = io;

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
