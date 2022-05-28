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
import Link from 'react-router-dom';
import UpdateUser from './update-user';

export function ProfileView({ movies, onUpdatedeUserInfo }) {
  // const [ user, setUser ] = useState({...
  // })

  // const favoriteMovieList = movies.filter((movies) => {
  // });

  // const getUser = () => {...
  // }

  // const handleSubmit = (e) => {...
  // }

  // const removeFav = (id) => {...
  // }

  // const handleUpdate = (e) => {...
  // };

  // useEffect(() => {...
  // }, [])

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavoriteMovies favoriteMovieList={favoriteMovieList} />
    </Container>
  );
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
