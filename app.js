import express from 'express';

import db from './lib/db';
db.connect();

let app = express();

app.use(express.static(__dirname + '/dist/'));

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
