import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from 'react-bootstrap';
import axios from 'axios';
export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 2) {
      setUsername('Username must be at least 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 10) {
      setPasswordErr('Password must be at least 10 characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Please enter an email address');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Please enter a valid email address');
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();

    if (isReq) {
      axios
        .post('https://desolate-basin-26751.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert('Registration successful! Please login');
          window.open('/', '_self');
        })
        .catch((response) => {
          console.log(response);
          alert('Sorry, unable to register');
        });
    }
  };

  return (
    <Container id="registration-form">
      <Row>
        <Col>
          <CardGroup>
            <Card id="registration-card">
              <Card.Body>
                <Card.Title id="registration-card-title">
                  Please register
                </Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label id="registration-form-label">
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label id="registration-form-label">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter password"
                      minLength="8"
                    />
                    {PasswordErr && <p>{PasswordErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    root
                    <Form.Label id="registration-form-label">Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email adress"
                    />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="dob">
                    <Form.Label id="registration-form-label">
                      Select a Date
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={date}
                      onChange={(e) => setBirthdate(e.target.value)}
                      required
                      placeholder="Enter your birthdate"
                      minLength="8"
                    />
                    {dateErr && <p>{dateErr}</p>}
                  </Form.Group>

                  <Button
                    id="register-button"
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  ></Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,
  onRegistration: PropTypes.func.isRequired,
};
