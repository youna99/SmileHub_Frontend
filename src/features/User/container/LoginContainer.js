import React, { useEffect, useState } from 'react';
import LoginPage from '../../../pages/User/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

export const LoginContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    console.log('로그인 시도 >>', { email, password });
  };
  return (
    <LoginPage
      error={error}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      navigate={navigate}
    />
  );
};
