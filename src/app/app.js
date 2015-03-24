// Libraries
import React from 'react';
import Fluxxor from 'fluxxor';
import Router, { Route, DefaultRoute } from 'react-router';

// Components
import Application from './components/Application';
import Home from './components/Home';
import Login from './components/Login';
import Admin, { ManageCases } from './components/admin/'

let stores = {};
let actions = {};

let flux = new Fluxxor.Flux(stores, actions);

let routes = (
  <Route handler={Application} path="/">
    <DefaultRoute handler={Home} />
    <Route name="login" handler={Login} />
    <Route name="admin" handler={Admin} >
      <Route name="manage-cases" handler={ManageCases} />
    </Route>
  </Route>
);

Router.run(routes, (Handler) => {
  React.render(<Handler />, document.getElementById('app'));
});
