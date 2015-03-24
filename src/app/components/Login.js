import React from 'react';
import { Button } from 'react-bootstrap';

let Login = module.exports = React.createClass({
  render() {
    return (
      <div className="col-md-6">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label for="username">Username</label>
            <input type="text" className="form-control" id="username" placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input type="text" className="form-control" id="password" placeholder="Enter password" />
          </div>
          <Button bsStyle="primary">Login</Button>
        </form>
      </div>
    );
  }
});
