import React, { useEffect, useState } from 'react';
import LoginPage from '../../../../pages/User/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setUserField, setUserFields } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/');
  //   }
  // }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      const { token, user } = res.data;

      // 토큰 로컬 스토리지에 저장
      localStorage.setItem('token', token);

      // Redux 업데이트
      // dispatch(setUserField({ field: 'email', value: user.email }));
      // dispatch(setUserField({ field: 'nickname', value: user.nickname }));
      // dispatch(setUserField({ field: 'age', value: user.age }));
      // dispatch(setUserField({ field: 'address', value: user.address }));
      dispatch(
        setUserFields({
          email: user.email,
          nickname: user.nickname,
          gender: user.gender,
          age: user.age,
          address: user.address,
          profile_image: user.profile_image,
          temp: user.temp,
          isActive: user.isActive,
          money: user.money,
        }),
      );

      console.log('로그인 성공', user);

      navigate('/');
    } catch (error) {
      console.error('로그인 실패', error.res?.data?.message || error.message);
      dispatch(
        setUserField({
          field: 'error',
          value: '로그인에 실패했습니다. 다시 시도해주세요.',
        }),
      );
    }
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
