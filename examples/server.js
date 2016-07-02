'use strict';

let express = require('express');
let logtopus = require('logtopus');
let bodyParser = require('body-parser');
let app = express();

app.use(logtopus.express({
  logLevel: 'debug'
}));

app.use(bodyParser.json());

app.get('/info', (req, res) => {
  res.json({
    name: 'api-inspect',
    version: 'v1.0.1'
  });
});

app.post('/login', (req, res) => {
  if (req.body.user === 'Andi' && req.body.password === '123456') {
    res.json({
      'sessionId': '33fab54cb',
      'userId': 1328
    });
  }
  else {
    res.status(403);
    res.send('invalid credentials');
  }
});

app.listen(8585);

module.exports = app;
