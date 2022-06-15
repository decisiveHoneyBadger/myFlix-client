import React from 'react';
import './profile-view.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { removeFav } from '../../actions/actions';

import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  CardGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

    axios
      .put(
        `https://desolate-basin-26751.herokuapp.com/users/${user}`,
        {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday,
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
        // localStorage.setItem('user', response.data.username);
        alert('profile updated successfully!');
        localStorage.clear(); // As of now, we are forcing user to login
        window.open('/', '_self');
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
  removeFav(movieId) {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    axios
      .delete(
        `https://desolate-basin-26751.herokuapp.com/users/${user}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        alert(`The movie was successfully deleted.`);
        window.open(`/users/${user}`, '_self');
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { movies } = this.props;
    const { favoriteMovies, username } = this.state;
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
                        <Form.Group className="profile-update-form">
                          <Form.Label className="profile-update-username">
                            Username:
                            <FormControl
                              type="text"
                              name="username"
                              placeholder="update your username"
                              onChange={this.setUsername}
                              required
                            />
                            <Form.Text className="text-muted">
                              Your username should be at least 4 characters long
                            </Form.Text>
                          </Form.Label>
                        </Form.Group>
                      </div>
                      <br />

                      <div className="p-0 d-flex-column">
                        <Form.Group className="profile-update-form">
                          <Form.Label className="profile-update-password">
                            Password:
                          </Form.Label>
                          <FormControl
                            type="password"
                            name="password"
                            placeholder="update your password"
                            onChange={(e) => this.setPassword(e.target.value)}
                            required
                          />
                          <Form.Text className="text-muted">
                            Your password should be at least 8 characters long
                          </Form.Text>
                        </Form.Group>
                      </div>
                      <br />

                      <div className="p-0 d-flex-column mb-2">
                        <Form.Group className="profile-update-form">
                          <Form.Label className="profile-update-email">
                            Email:
                            <FormControl
                              type="email"
                              name="email"
                              placeholder="update your email"
                              onChange={(e) => this.setEmail(e.target.value)}
                              required
                            />
                          </Form.Label>
                        </Form.Group>
                      </div>
                      <br />

                      <div className="p-0 d-flex-column">
                        <Form.Group className="profile-update-form">
                          <Form.Label className="profile-update-birthday">
                            Birthday:
                            <FormControl
                              type="date"
                              name="birthday"
                              placeholder="insert your new email here"
                              onChange={(e) => this.setBirthday(e.target.value)}
                              required
                            />
                          </Form.Label>
                        </Form.Group>
                      </div>
                    </Container>
                  </Container>
                  <Container className="mt-2 text-center">
                    <Button
                      variant="primary custom-btn"
                      type="submit"
                      onClick={this.editProfile}
                    >
                      Update profile
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
            <Card className="mt-2 mb-2">
              <Container className="p-1 text-center card-custom">
                <Button
                  style={{ width: '80%' }}
                  className="profile-delete-button"
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
            <Card.Title className="profile-fav-movies-list">
              Favorite movies
            </Card.Title>
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
                            onClick={() => this.removeFav(movie._id)}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { removeFav })(ProfileView);
