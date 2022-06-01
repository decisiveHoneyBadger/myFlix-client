import React, { useEffect } from 'react';

import './profile-view.scss';
import axios from 'axios';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import PropTypes from 'prop-types';

import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UpdateUser from './update-user';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      password: null,
      birthday: null,
      favoriteMovies: [],
    };
    this.removeFav = this.removeFav.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  getUser(token) {
    let user = localStorage.getItem('user');
    axios
      .get(`https://desolate-basin-26751.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //assign the result to the state
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((e) => console.log(e));
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  editProfile = (e) => {
    e.preventDefault();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    let newUser = this.state.username;
    console.log(newUser);
    axios
      .put(
        `https://desolate-basin-26751.herokuapp.com/users/${user}`,
        {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          birthday: this.state.birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
        });
        localStorage.setItem('user', this.state.username);
        alert('profile updated successfully!');
        window.open(`/users/${newUser}`, '_self');
      });
  };

  deleteProfile() {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .delete(
        `https://desolate-basin-26751.herokuapp.com/users/${username}`,

        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        console.log(response);
        alert('profile deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      })
      .catch((e) => console.log(e));
  }

  setUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  setPassword(value) {
    this.setState({
      password: value,
    });
  }
  setEmail(value) {
    this.setState({
      email: value,
    });
  }
  setBirthday(value) {
    this.setState({
      birthday: value,
    });
  }
  removeFav() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const id = this.state.favoriteMovies;

    axios
      .delete(
        `https://desolate-basin-26751.herokuapp.com/users/${user}/favoriteMovies/${id}`,

        { headers: { Authorization: `Bearer ${token}` } },
        {},
      )
      .then((response) => {
        console.log(response);
        alert('Movie deleted from favorites!');
        window.open(`/movies/${id}`, '_self');
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { movies } = this.props;
    const { favoriteMovies, username } = this.state;
    console.log('Hey this is State', this.state);
    if (!username) {
      return null;
    }

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Form
                  className="update-form"
                  onSubmit={(e) =>
                    this.editProfile(
                      e,
                      this.username,
                      this.password,
                      this.email,
                      this.birthday,
                    )
                  }
                >
                  <Container>
                    {/* <UserDetailsView /> */}
                    <Container className="flex-item pt-5">
                      <div className="p-0 d-flex-column">
                        <FormControl
                          type="text"
                          name="username"
                          placeholder="insert your new username here"
                          onChange={this.setUsername}
                          required
                        />
                        <Form.Text className="text-muted">
                          Your username should be at least 4 characters long
                        </Form.Text>
                      </div>

                      <div className="p-0 d-flex-column">
                        <FormControl
                          type="text"
                          name="password"
                          placeholder="insert your new password here"
                          onChange={(e) => this.setPassword(e.target.value)}
                          required
                        />
                        <Form.Text className="text-muted">
                          Your password should be at least 8 characters long
                        </Form.Text>
                      </div>

                      <div className="p-0 d-flex-column mb-2">
                        <FormControl
                          type="email"
                          name="email"
                          placeholder="insert your new email here"
                          onChange={(e) => this.setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="p-0 d-flex-column">
                        <FormControl
                          type="date"
                          name="birthday"
                          placeholder="insert your new email here"
                          onChange={(e) => this.setBirthday(e.target.value)}
                          required
                        />
                      </div>
                    </Container>
                  </Container>
                  <Container className="mt-2 text-center">
                    <Button
                      variant="primary custom-btn"
                      type="submit"
                      onClick={this.editProfile}
                    >
                      Update profile info
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
            <Card className="mt-2 mb-2">
              <Container className="p-1 text-center card-custom">
                <Button
                  style={{ width: '80%' }}
                  className="custom-btn-delete m-1"
                  variant="primary"
                  type="submit"
                  onClick={this.deleteProfile}
                >
                  Delete your entire profile
                </Button>{' '}
              </Container>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Body>
            {favoriteMovies.length === 0 && (
              <div className="titles h1 text-center">
                <h1>There's no movies in your list of favorites!</h1>
                <p className="h5">
                  Head over to the{' '}
                  <Link to={`/`}>
                    <Button className="custom-btn" type="submit">
                      List of movies
                    </Button>
                  </Link>{' '}
                  to add some
                </p>
              </div>
            )}
            <Row className="favorite-movies d-flex justify-content-around">
              {favoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (
                    movie._id ===
                    favoriteMovies.find((fav) => fav === movie._id)
                  ) {
                    return (
                      <Card className="favorite-movie m-2" key={movie._id}>
                        <Link to={`/movies/${movie._id}`}>
                          <Card.Img
                            variant="top"
                            src={movie.ImagePath}
                            className="img-responsive"
                          />
                        </Link>

                        <Card.Body>
                          <Card.Title className="h1 titles">
                            {movie.Title}
                          </Card.Title>
                          <Button
                            className="custom-btn"
                            onClick={this.removeFav}
                          >
                            Remove from List
                          </Button>
                        </Card.Body>
                      </Card>
                    );
                  }
                })}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
