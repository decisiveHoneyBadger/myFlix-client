import React from 'react';
import axios from 'axios';
import './movie-view.scss';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFav } from '../../actions/actions';

export function MovieView(props) {
  const { movie, onBackClick } = props;
  const addFav = (movieId) => {
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
          <Button id="movie-view-button" onClick={() => addFav(movie._id)}>
            Add to favorites
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    movie: state.movie,
  };
};

export default connect(mapStateToProps, { addFav })(MovieView);
