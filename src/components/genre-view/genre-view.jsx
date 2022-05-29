import React from 'react';
import axios from 'axios';
import './genre-view.scss';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types';

export function GenreView() {
  const homeURL = 'https://desolate-basin-26751.herokuapp.com';
  const [genre, setGenre] = useState('');
  const [movies, setMovies] = useState('');
  const [genresMovies, setGenres] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { genre_id } = useParams();

  useEffect(() => {
    let accessToken = localStorage.getItem('token');
    getMissingData(accessToken);
  }),
    [];

  async function getMissingData(accessToken) {
    axios
      .all([
        axios(homeURL + 'genres/' + genre_id, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        axios(homeURL + 'movies/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      ])
      .then(
        axios.spread((genreData, movieData) => {
          setGenre(genreData.data);
          setMovies(moviesData.data);
          moviesData.data.forEach((movie) => {
            if (movie.Genre.includes(genre_id))
              setGenresMovies((prevData) => {
                return [...prevData, movie];
              });
          });
        }),
      )
      .catch((error) => console.error(error))
      .finally(() => {
        console.log('Genres movies: ' + genreMovies);
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
      <Row>
        <Col md={30}>
          <CardGroup>
            {movies.map((movie) => (
              <Card className="favorite-movie card-content" key={movie._id}>
                <Card.Img
                  className="fav-poster"
                  variant="top"
                  src={movie.ImagePath}
                />
                <Card.Body style={{ backgroundColor: 'black' }}>
                  <Card.Title className="movie_title">{movie.Title}</Card.Title>
                  <Link to={`/genres/${genre._id}`}>
                    <Button id="card-button" variant="link">
                      Show more
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
