import React, { useState } from 'react';
import UserEdit from '../components/UserEdit';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserEditContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 주소 modal 상태관리
  const [isChangingPassword, setIsChangingPassword] = useState(false); // 비밀번호 변경 여부 확인 상태
  const [isPasswordMatch, setIsPasswordMatch] = useState(false); // 기존 비밀번호가 맞는지 확인 상태
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

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
    // 비밀번호가 변경되지 않았다면 password 필드를 삭제
    const { password, ...rest } = data;

    // 비밀번호를 변경할 때만 서버에 보냄
    const updatedData = {
      ...rest,
      ...(isChangingPassword && { password }), // 비밀번호 변경 시만 포함
    };

    try {
      const res = await axios.patch(
        `http://localhost:8000/user/${currentUser.userId}`,
        updatedData,
      );

      if (res.status === 200) {
        alert('정보가 수정되었습니다.');
        navigate('/mypage');
      }
    } catch (error) {
      console.error('회원정보 수정 실패', error);
      alert('정보 수정에 실패하였습니다.');
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
      isChangingPassword={isChangingPassword}
      setIsChangingPassword={setIsChangingPassword}
    />
  );
};

export default UserEditContainer;
