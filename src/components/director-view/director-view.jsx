import React from 'react';

import { Row, ListGroup, Button } from 'react-bootstrap';

export function DirectorView(props) {
  const { onBackClick } = props;

  return (
    <>
      <Row className="justify-content-center mx-4">
        <ListGroup>
          <ListGroup.Item className="h3 justify-content-center">
            {props.director.Name}
          </ListGroup.Item>
          <ListGroup.Item className="h6 text-muted">
            {props.director.Bio}
          </ListGroup.Item>
          <ListGroup.Item className="h6 text-muted">
            Birthyear: {props.director.Birth}
          </ListGroup.Item>
          <ListGroup.Item className="h6 text-muted">
            Deathyear: {props.director.Death}
          </ListGroup.Item>
        </ListGroup>
        <Button
          id="movie-view-button"
          onClick={() => {
            onBackClick();
          }}
        >
          Back
        </Button>
      </Row>
    </>
  );
}
