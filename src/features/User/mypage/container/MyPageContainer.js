import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, setUserField } from '../../store/userSlice';
import axios from 'axios';
import MyPage from '../../../../pages/User/MyPage';

const MyPageContainer = () => {
  const [images, setImages] = useState([]); // 이미지 상태 관리
  const [profileEdit, setProfileEdit] = useState(false); // 프로필 수정 상태 관리
  const [originalProfileImage, setOriginalProfileImage] = useState(''); // 원본 프로필 이미지 저장 상태 관리
  const currentUser = useSelector((state) => state.user.currentUser);
  const sells = useSelector((state) => state.mypage.sells);
  const buys = useSelector((state) => state.mypage.buys);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 컴포넌트가 마운트될 때 원래 프로필 이미지를 저장
  useEffect(() => {
    setOriginalProfileImage(currentUser.profile_image);
  }, [currentUser.profile_image]);

  const handleEdit = () => {
    navigate('/mypageEdit');
  };

  // 회원 탈퇴
  const handleDelete = async () => {
    const isDelete = window.confirm('회원을 탈퇴하시겠습니까?');
    if (isDelete) {
      try {
        const userId = currentUser.userId;
        await axios.delete(`http://localhost:8000/user/${userId}`);

        dispatch(deleteUser());
        alert('그동안 이용해주셔서 감사합니다.');
        navigate('/');
      } catch (error) {
        console.error('회원 탈퇴 중 오류가 발생했습니다:', error);
        alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  // 프로필 수정하기
  const handleProfileClick = async () => {
    if (profileEdit) {
      // 수정 완료 버튼 클릭 시
      if (images.length > 0) {
        try {
          const userId = currentUser.userId;
          const newProfileImage = images[0];

          // 로컬 스토리지에서 토큰 가져오기
          const token = localStorage.getItem('token');

          await axios.patch(
            `http://localhost:8000/user/${userId}`,
            {
              profile_image: newProfileImage,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          // 프로필 이미지 업데이트
          dispatch(
            setUserField({ field: 'profile_image', value: newProfileImage }),
          );
          setProfileEdit(false);
        } catch (error) {
          console.error('프로필 수정 중 에러 발생', error);
          alert('프로필 수정에 실패하였습니다.');
        }
      } else {
        setProfileEdit(false);
      }
    } else {
      // 프로필 수정하기 버튼 클릭 시
      setProfileEdit(true);
      setImages([]);
    }
  };

  // 프로필 수정 시 취소 버튼 클릭
  const handleCancel = () => {
    setProfileEdit(false);
    setImages([originalProfileImage]);
  };

  return (
    <MyPage
      profileEdit={profileEdit}
      images={images}
      setImages={setImages}
      currentUser={currentUser}
      handleProfileClick={handleProfileClick}
      handleCancel={handleCancel}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      sells={sells}
      buys={buys}
    />
  );
};

export default MyPageContainer;
