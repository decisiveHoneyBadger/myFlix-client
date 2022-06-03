import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function MovieView(props) {
  const { movie, onBackClick } = props;
  const addToFavoriteList = (movieId) => {
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .post(
        `https://desolate-basin-26751.herokuapp.com/users/${currentUser}/movies/${movieId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((response) => {
        alert(`The movie was successfully add to your list.`);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card id="movie-view">
            <Card.Body>
              <Card.Img
                id="movie-view-image"
                variant="top"
                crossOrigin="anonymous"
                src={movie.ImagePath}
              />
              <Card.Title id="movie-title" className="movie-title">
                {movie.Title}
              </Card.Title>
              <Card.Text id="movie-description" className="movie-description">
                {movie.Description}
              </Card.Text>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button
                  variant="link"
                  id="movie-director"
                  className="movie-director"
                >
                  Director: {movie.Director.Name}
                </Button>
              </Link>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link" id="movie-genre" className="movie-gerne">
                  Genre: {movie.Genre.Name}
                </Button>
              </Link>
            </Card.Body>
          </Card>
          <Button
            id="movie-view-button"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
          <Button
            id="movie-view-button"
            onClick={() => addToFavoriteList(movie._id)}
          >
            Add to favorites
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
