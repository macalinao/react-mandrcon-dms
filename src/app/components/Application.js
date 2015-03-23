var React = require('react');

var Navbar = require('./Navbar');

var Application = module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar />
        <h2>Hello, World</h2>
      </div>
    );
  }
});
