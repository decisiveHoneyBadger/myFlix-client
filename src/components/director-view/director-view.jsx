import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Row, Col, Spinner, ListGroup, Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types';

export function DirectorView() {
  const homeURL = 'https://desolate-basin-26751.herokuapp.com';
  const [director, setDirector] = useState('');
  const [movies, setMovies] = useState('');
  const [directorMovies, setDirectorMovies] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { director_id } = useParams();

  useEffect(() => {
    let accessToken = localStorage.getItem('token');
    getMissingData(accessToken);
  }),
    [];

  async function getMissingData(accessToken) {
    axios
      .all([
        axios(homeURL + 'directors/' + director_id, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        axios(homeURL + 'movies/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      ])
      .then(
        axios.spread((directorData, movieData) => {
          setDirector(directorData.data);
          setMovies(moviesData.data);
          moviesData.data.forEach((movie) => {
            if (movie.Director === director_id)
              setDirectorMovies((prevData) => {
                return [...prevData, movie];
              });
          });
        }),
      )
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) {
    return;
    <Row className="justify-content-center mx-5">
      <div className="h3 text-muted text-center">
        Data is loading &nbsp;
        <Spinner animation="border" variant="secondary" role="status" />
      </div>
    </Row>;
  }

  if (error) {
    return;
    <Row className="justify-content-center mx-5">
      <p>There was an error loading your data!</p>
    </Row>;
  }

  return (
    <>
      <Row className="justify-content-center mx-4">
        <ListGroup>
          <ListGroup.Item className="h3 justify-content-center">
            {director.Name}
          </ListGroup.Item>
          <ListGroup.Item className="h6 text-muted">
            {director.Bio}
          </ListGroup.Item>
        </ListGroup>
      </Row>
      <ListGroup horizontal>
        <Row>
          <Col>
            <ListGroup>
              <ListGroup.Item className="h6 text-muted">
                Movies from {director.Name}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row className="main-view justify-content-md-evenly m-0 p-2 align-items-start">
          {directorMovies ? (
            directorMovies.map((movie) => (
              <Col md={3} key={movie._id}>
                <MovieCard md={8} movieData={movie} />
              </Col>
            ))
          ) : (
            <Col md={3}>There are no movies of this director</Col>
          )}
        </Row>
      </ListGroup>
    </>
  );
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
  }).isRequired,
};
