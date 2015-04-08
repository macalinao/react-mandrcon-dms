import React from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';

export default React.createClass({
  render() {
    return (
      <div>
        <Row>
          <Col md={12}>
            <h1>Manage Cases</h1>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <h2>Current Cases</h2>
            <Button bsStyle="success"><i className="fa fa-plus"></i>&nbsp;Add Cases</Button>
            <h3>Unassigned</h3>
            <h3>Assigned</h3>
          </Col>
          <Col md={4}>
            <h2>Stats</h2>
          </Col>
        </Row>
      </div>
    );
  }
});
