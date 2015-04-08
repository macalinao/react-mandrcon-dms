import React from 'react';
import { RouteHandler } from 'react-router';
import { Grid } from 'react-bootstrap';

import Navbar from './Navbar';

export default React.createClass({
  render() {
    return (
      <div>
        <Navbar />
        <Grid>
          <RouteHandler />
        </Grid>
      </div>
    );
  }
});
