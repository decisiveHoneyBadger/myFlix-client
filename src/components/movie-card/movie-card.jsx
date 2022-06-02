import React from 'react';
import Button from 'react-bootstrap/Button';
import { CardGroup, Container, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export function MovieCard(props) {
  const { movie } = props;

  return (
    <Container>
      <CardGroup>
        <Card id="movie-card">
          <Card.Img
            variant="top"
            src={movie.ImagePath}
            crossOrigin="anonymous"
          />
          <Card.Body>
            <Card.Title id="card-title">{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button id="card-button" variant="primary">
                Show more
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </CardGroup>
    </Container>
  );
}
