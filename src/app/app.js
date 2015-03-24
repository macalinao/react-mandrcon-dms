// Libraries
import React from 'react';
import Fluxxor from 'fluxxor';
import Router, { Route, DefaultRoute } from 'react-router';

// Components
import Application from './components/Application';
import Home from './components/Home';
import Login from './components/Login';

let stores = {};
let actions = {};

let flux = new Fluxxor.Flux(stores, actions);

let routes = (
  <Route handler={Application} path="/">
    <DefaultRoute handler={Home} />
    <Route handler={Login} path="/login" />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
