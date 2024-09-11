import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, setUserFields } from '../../store/userSlice';
import RegisterPage from '../../../../pages/User/RegisterPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const RegisterContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 주소 modal 상태관리
  const [checkEmail, setCheckEmail] = useState(false); // 이메일 중복 확인 상태
  const [checkNickname, setCheckNickname] = useState(false); // 닉네임 중복 확인 상태
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);

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
    // e.preventDefault();
    console.log('data >>', data);

    if (!checkEmail) {
      alert('이메일 중복 검사를 먼저 해주세요.');
      return;
    }
    if (!checkNickname) {
      alert('닉네임 중복 검사를 먼저 해주세요.');
      return;
    }

    // 성별 변환
    let genderValue;
    if (data.gender === 'male') {
      genderValue = 1; // 남성
    } else if (data.gender === 'female') {
      genderValue = 0; // 여성
    } else {
      genderValue = null; // default인 경우 null로 설정
    }

    try {
      const res = await axios.post(`${REACT_APP_API_URL}/user`, {
        nickname: data.nickname,
        email: data.email,
        password: data.password,
        gender: genderValue,
        age: data.age,
        profileImage: null, // 기본값
        depth1: data.address.sido,
        depth2: data.address.sigungu,
        depth3: data.address.bname,
        depth4: data.address.detailAddress,
        isActive: 1, // 기본값
        isAdmin: 0, // 기본값
      });
      console.log('res >>', res);

      if (res.status === 201) {
        dispatch(
          setUserFields({
            userId: res.data.newUser.userId,
            nickname: data.nickname,
            email: data.email,
            password: data.password,
            gender: genderValue,
            age: data.age,
            profile_image: null, // 기본값
            sido: data.address.sido,
            sigungu: data.address.sigungu,
            bname: data.address.bname,
            detailAddress: data.address.detailAddress,
            postcode: data.address.postcode,
            address: data.address.address,
            extraAddress: data.address.extraAddress,
            isActive: 1, // 기본값
            isAdmin: 0, // 기본값
          }),
        );
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

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    console.log('checkEmail >>', checkEmail);

    try {
      const res = await axios.post(`${REACT_APP_API_URL}/user/checkEmail`, {
        email,
      });
      console.log('res >>', res);

      if (res.status === 200) {
        alert('사용 가능한 이메일입니다.');
      }
      setCheckEmail(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // 409 상태 코드가 발생했을 때 처리
        alert('이미 사용 중인 이메일입니다.');
      } else {
        // 그 외의 오류 처리
        console.error('이메일 중복체크 오류', error);
      }
    }
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    try {
      const res = await axios.post(`${REACT_APP_API_URL}/user/checkNickname`, {
        nickname,
      });
      console.log('res >>', res);

      if (res.status === 200) {
        alert('사용 가능한 닉네임입니다.');
        setCheckNickname(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // 409 상태 코드가 발생했을 때 처리
        alert('이미 사용 중인 닉네임입니다.');
      } else {
        // 그 외의 오류 처리
        console.error('닉네임 중복체크 오류', error);
      }
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
      email={email}
      nickname={nickname}
      setEmail={setEmail}
      setNickname={setNickname}
      checkEmail={checkEmail}
      setCheckEmail={setCheckEmail}
      checkNickname={checkNickname}
      setCheckNickname={setCheckNickname}
      handleCheckEmail={handleCheckEmail}
      handleCheckNickname={handleCheckNickname}
    />
  );
};

export default RegisterContainer;
