var React = require('react');
var Fluxxor = require('fluxxor');

var stores = {};
var actions = {};

var flux = new Fluxxor.Flux(stores, actions);

var Application = require('./components/Application');

React.render(<Application />, document.getElementById('app'));
