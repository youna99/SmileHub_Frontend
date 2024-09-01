import React, { useState } from 'react';
import UserEdit from '../components/UserEdit';
import { useDispatch, useSelector } from 'react-redux';
import { setUserField } from '../../store/userSlice';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const UserEditContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 주소 modal 상태관리
  const [isPasswordMatch, setIsPasswordMatch] = useState(false); // 기존 비밀번호가 맞는지 확인
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // useForm 설정
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      gender: currentUser.gender || 'default',
      nickname: currentUser.nickname,
      age: currentUser.age || '',
      address: {
        postcode: currentUser.address.postcode,
        address: currentUser.address.address,
        detailAddress: currentUser.address.detailAddress,
        extraAddress: currentUser.address.extraAddress,
      },
    },
  });
  const password = watch('password');
  const oldPassword = watch('oldPassword');

  // 기존 비밀번호 확인
  const handleOldPasswordCorrect = () => {
    if (oldPassword === currentUser.password) {
      setIsPasswordMatch(true);
    } else {
      alert('기존 비밀번호가 일치하지 않습니다.');
      setIsPasswordMatch(false);
    }
  };

  // 수정하기
  const onSubmit = async (data) => {
    console.log('data', data);

    Object.keys(data).forEach((key) => {
      dispatch(setUserField({ field: key, value: data[key] }));
    });
    try {
      const res = await axios.patch(
        `http://localhost:8000/user/${currentUser.userId}`,
        {
          password: data.password,
          nickname: data.nickname,
          age: data.age,
          gender: data.gender,
          depth1: data.address.sido,
          depth2: data.address.sigungu,
          depth3: data.address.bname,
          depth4: data.address.detailAddress,
        },
      );

      if (res.status === 200) {
        alert('정보가 수정되었습니다.');
      }
    } catch (error) {
      console.error('회원정보 수정 실패', error);
    }
  };
  return (
    <UserEdit
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      isPasswordMatch={isPasswordMatch}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      setValue={setValue}
      password={password}
      handleOldPasswordCorrect={handleOldPasswordCorrect}
      onSubmit={onSubmit}
      currentUser={currentUser}
    />
  );
};

export default UserEditContainer;
