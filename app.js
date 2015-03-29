'use strict';
const express = require('express');

const db = require('./lib/db');
db.connect();

let app = express();

app.use(express.static(__dirname + '/dist/'));

let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
