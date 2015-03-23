var React = require('react');
var Router = require('react-router');
var { RouteHandler } = Router;

var Navbar = require('./Navbar');

var Application = module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <RouteHandler />
        </div>
      </div>
    );
  }
});
