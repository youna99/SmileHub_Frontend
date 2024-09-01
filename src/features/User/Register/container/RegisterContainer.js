import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, setUserField } from '../../store/userSlice';
import RegisterPage from '../../../../pages/User/RegisterPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 주소 modal 상태관리
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log('currentUser >>>', currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useForm 설정
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset, // 폼 리셋을 위한 기능 추가
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      gender: 'default',
    },
  });
  const password = watch('password');

  // 회원가입 폼 제출
  const onSubmit = async (data) => {
    console.log('data >>', data);

    Object.keys(data).forEach((key) => {
      dispatch(setUserField({ field: key, value: data[key] }));
    });

    try {
      const res = await axios.post('http://localhost:8000/user', {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        age: data.age,
        gender: data.gender,
        depth1: data.address.sido,
        depth2: data.address.sigungu,
        depth3: data.address.bname,
        depth4: data.address.detailAddress,
      });

      if (res.status === 201) {
        // 사용자 등록
        dispatch(registerUser());
        alert('회원가입이 완료되었습니다.');
        reset();
        navigate('/login');
      }
    } catch (error) {
      console.error('회원가입 실패', error);
      alert('회원가입을 실패했습니다. 다시 시도해 주세요.');
    }
  };
  return (
    <RegisterPage
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      setValue={setValue}
      password={password}
      onSubmit={onSubmit}
      currentUser={currentUser}
      navigate={navigate}
    />
  );
};

export default RegisterContainer;
