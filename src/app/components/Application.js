import React from 'react';
import { RouteHandler } from 'react-router';

import Navbar from './Navbar';

export default React.createClass({
  render() {
    return (
      <div>
        <Navbar />
        <RouteHandler />
      </div>
    );
  }
});
