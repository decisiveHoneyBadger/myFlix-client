import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Spinner,
  ListGroup,
  Container,
  Button,
} from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export function DirectorView(props) {
  const { onBackClick } = props;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  console.log(props);

  if (error) {
    return (
      <Row className="justify-content-center mx-5">
        <p>There was an error loading your data!</p>
      </Row>
    );
  }

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
