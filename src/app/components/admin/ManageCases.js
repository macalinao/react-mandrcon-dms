import React from 'react';
import { Grid, Row, Col, Button, Table } from 'react-bootstrap';

export default React.createClass({
  render() {
    return (
      <Grid>
        <Row>
          <h1>Manage Cases</h1>
          <Button bsStyle="success">Add Cases</Button>
        </Row>
        <Row>
          <Col md={8}>
            <h2>Overview</h2>
            <h3>Unassigned</h3>
            <h3>Assigned</h3>
          </Col>
          <Col md={4}>
            <h2>Stats</h2>
          </Col>
        </Row>
      </Grid>
    );
  }
});