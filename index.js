const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const host = 'localhost';
const db = require('./queries');
const http = require('http');
const cors = require('cors');

app.disable('etag');

var server = http.createServer(app).listen(port, function () {
  console.log(`App running on port ${port}.`);
});

server.timeout = 240000;

app.options('*', cors());
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const arrangement = require('./app/routes/arrangement')(app);
const reservation = require('./app/routes/reservation')(app);
const user = require('./app/routes/user')(app);
const contract = require('./app/routes/contract')(app);
const hotel = require('./app/routes/hotel')(app);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.post('/', (request, response) => {
  response.json({ info: '/' });
});
