import React, { useEffect, useState } from 'react';
import LoginPage from '../../../../pages/User/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { setUserField, setUserFields } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const isAuthenticated = useSelector((state) => state.user.isActive);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      const { token, user } = res.data;

      console.log('user', user);
      console.log('token', token);

      // 토큰 로컬 스토리지에 저장
      localStorage.setItem('token', token);

      // Redux 업데이트
      dispatch(
        setUserFields({
          userId: user.userId,
          nickname: user.nickname,
          email: user.email,
          gender: user.gender,
          age: user.age,
          temp: user.temp,
          profile_image: user.profile_image,
          money: user.money,
          sido: user.Locations[0].depth1,
          sigungu: user.Locations[0].depth2,
          bname: user.Locations[0].depth3,
          detailAddress: user.Locations[0].depth4,
          isActive: user.Active.isActive,
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
