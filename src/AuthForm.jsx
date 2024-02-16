import React, { useState }  from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function AuthForm() {
	const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleLoginChange = (e) => {
    setLoginValue(e.target.value);
    setError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const loginType = /^\d+$/.test(loginValue) ? 'phone' : 'email';

      const response = await axios.post('https://test-api.it-finans.ru/login',
        {
          login: loginValue,
          password: password,
          type: loginType,
        },
        {
          headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.ok === true) {
        //console.log('Вход выполнен:', response.data.data.name);
        setSuccess('Вход выполнен');
      } 
      else {
        //console.log('Ошибка входа:', response.data.error);
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Ошибка входа:', error.message);
      setError('Пользователь с такими логином и паролем не существует');
    }
  };

  return (
    <Container className='container'>
      <div className='form-container'>
        <h2 className='mb-4'>Авторизация</h2>
        <Form onSubmit={handleLoginSubmit}>
          
          {error && <Alert variant='danger'>{error}</Alert>}
          {success && <Alert variant='success'>{success}</Alert>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Логин</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Email или телефон" 
              value={loginValue}
              onChange={handleLoginChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordChange}
              required 
            />
          </Form.Group>

          <div className='d-flex align-items-center'>
            <Button className="btn btn-primary mr-auto" type="submit">Войти</Button>
            <div className='space'></div>
            <Link to='/registration' className='btn btn-link p-0 text-decoration-none'>Регистрация</Link>
          </div>

        </Form>
      </div>
    </Container>
  );
}

export default AuthForm;
