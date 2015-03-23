/** @jsx React.DOM */

'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');

var ExampleApp = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Hello, World</h2>
      </div>
    );
  }
});

React.render(
  <ExampleApp />, document.getElementById('app')
);
