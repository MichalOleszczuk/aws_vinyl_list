const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./db');

const middlewares = [
  // parse application/json
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
];

// Apply middlewares
app.use(middlewares);

app.use(function allowOrigins(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    res.status(200).json({});
  }
  next();
});

app.get('/list', (req, res) => {
  res.json(db.getVinyllsList());
});

app.post('/', function (req, res) {
  db.createNewRecord(req.body);
  res.send(200);
});

app.put('/:vinyllId', function (req, res) {
  db.updateRecord(parseInt(req.params.vinyllId, 10), req.body);
  res.send(200);
});

app.delete('/:vinyllId', function (req, res) {
  db.deleteRecord(parseInt(req.params.vinyllId, 10));
  res.send(200);
});

app.delete('/:vinyllId/track/:trackId', function (req, res) {
  db.deleteTrackRecord(parseInt(req.params.vinyllId, 10), parseInt(req.params.trackId, 10));
  res.send(200);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
