var React = require('react');
var Fluxxor = require('fluxxor');
var Router = require('react-router');
var { Route, DefaultRoute } = Router;

var stores = {};
var actions = {};

var flux = new Fluxxor.Flux(stores, actions);

var Application = require('./components/Application');
var Home = require('./components/Home');

var routes = (
  <Route handler={Application} path="/">
    <DefaultRoute handler={Home} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
