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
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ values, usernameErr: 'Username must be 5 characters long!' });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password required!' }),
        (isReq = false);
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: 'Password must be 6 characters long!',
      });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email Required!' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Email is invalid!' });
      isReq = false;
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
          Email: email,
          Password: password,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please login!');
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((response) => {
          console.log(response);
          alert('Sorry, unable to register');
        });
    }
  };

  return (
    <Container id="registration-form">
      <Row className="mt-5">
        <Col md={12}>
          <Form>
            <h3>Register</h3>
            <p></p>
            <Form.Group controlId="formUsername" className="reg-form-inputs">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
              {values.usernameErr && <p>{value.usernameErr}</p>}
            </Form.Group>
            <br />
            <Form.Group controlId="Email" className="reg-form-inputs">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {values.emailErr && <p>{values.emailErr}</p>}
            </Form.Group>
            <br />
            <Form.Group controlId="fromPassword" className="reg-form-inputs">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {values.passwordErr && <p>{values.passwordErr}</p>}
            </Form.Group>
            <br />
            <Form.Group controlId="updateBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                onChange={(e) => setBirthday(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            <br /> <br />
            <p class="register-form-text">
              Already registered? <Link to={'/'}>Login</Link> here
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }).isRequired,
  onRegistration: PropTypes.func.isRequired,
};
