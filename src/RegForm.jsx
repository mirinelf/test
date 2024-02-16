import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import CloseIcon from './x-circle.svg';

function RegForm() {

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

	const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const response = await axios.post('https://test-api.it-finans.ru/registration', 
      {
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        password: userData.password,
      });

      if (response.data.ok === true) {
        // console.log('Регистрация выполнена:', response.data.name);
        setSuccess('Регистрация выполнена успешно')
      } 
      else {
        // console.log('Пользователь с такими телефоном или почтой уже существует', response.data.error);
        setError('Пользователь с такими телефоном или почтой уже существует');
      }
    } 
    catch (error) {
      // console.error('Ошибка:', error.message);
      setError('Попробуйте еще раз.');
    }
  };

	return (
		<Container>
      <div className='form-container'>
        <Link to='/' className='d-flex justify-content-end btn btn-link p-0 mb-1'>
          <img src={CloseIcon} alt="close icon" />
        </Link>
        <h2 className='d-flex justify-content-center mb-4'>Регистрация</h2>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant='danger'>{error}</Alert>}
          {success && <Alert variant='success'>{success}</Alert>}
          <Form.Group className='mb-3' controlId="name">
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя пользователя"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              minLength={2}
              maxLength={10}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId="phone">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Введите телефон"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              pattern="(\+7|8)[0-9]{10}"
              required
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId="email">
            <Form.Label>Почта</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введите почту"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              minLength={4}
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className='mb-4' controlId="confirmPassword">
            <Form.Label>Повторите пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Повторите пароль"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleInputChange}
              minLength={4}
              maxLength={20}
              required
            />
          </Form.Group>

          <Button className='w-100' type="submit">Зарегистрироваться</Button>

        </Form>
      </div>
    </Container>
	)
}

export default RegForm