import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerUser,
  setUserField,
} from '../../../features/User/store/userSlice';
import RegisterPage from '../../../pages/User/RegisterPage';

const RegisterContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 주소 modal 상태관리
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log('currentUser >>>', currentUser);

  const dispatch = useDispatch();

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
  const onSubmit = (data) => {
    console.log('data >>', data);

    Object.keys(data).forEach((key) => {
      dispatch(setUserField({ field: key, value: data[key] }));
    });

    // 사용자 등록
    dispatch(registerUser());
    alert('회원가입이 완료되었습니다.');

    // 폼 리셋
    reset();
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
    />
  );
};

export default RegisterContainer;
