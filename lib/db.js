'use strict';
const mongoose = require('mongoose');

exports.connect = function connect() {
  mongoose.connect('mongodb://localhost:27017/mandrcon');
}
