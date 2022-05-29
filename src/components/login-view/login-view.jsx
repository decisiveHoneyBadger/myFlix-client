import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [email, setEmail] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email required');
      isReq = false;
    }
    // else if (password.length < 10) {
    //   setPasswordErr('Password must be at least 10 characters long');
    //   isReq = false;
    // }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // (e = event) prevents the default behavior of submitting a form
    /* Send a request to the server for authentication */
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://desolate-basin-26751.herokuapp.com/login', {
          Username: username,
          Password: password,
          Email: email,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data); // (data = token, username) if the previous methos is successful, this method is calles
        })
        .catch((e) => {
          console.log('Sorry, there is no such user');
          console.log(e.response);
        });
    }
  };

  return (
    <Container id="login-form">
      <Row>
        <Col>
          <CardGroup>
            <Card id="login-card">
              <Card.Body>
                <Card.Title id="login-card-title">Please login</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label id="login-form-label">Username</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label id="login-form-label">Email</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label id="login-form-label">Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Button
                    id="login-button"
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                </Form>
                <Card.Text>Not registered yet?</Card.Text>
                <div id="register-container">
                  <Link to="/register">
                    <Button id="link-to-register-button">Register now</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
