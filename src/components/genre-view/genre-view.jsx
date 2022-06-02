import React from 'react';
import './genre-view.scss';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export function GenreView(props) {
  const { genre, onBackClick } = props;

  return (
    <Container>
      <Row>
        <Col>
          <Card id="genre-view">
            <Card.Body>
              <Card.Title>{genre.Name}</Card.Title>
              <Card.Text>Bio: {genre.Description}</Card.Text>
              <Button
                id="genre-back-button"
                onClick={() => {
                  onBackClick();
                }}
              >
                Back
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
