import React, { useState } from 'react';
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
  // const sells = useSelector((state) => state.mypage.sells);
  // const buys = useSelector((state) => state.mypage.buys);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 컴포넌트가 마운트될 때 프로필 이미지를 저장
  // useEffect(() => {
  //   setOriginalProfileImage(currentUser.profileImage);
  // }, [currentUser.profileImage]);

  const handleEdit = () => {
    navigate('/mypageEdit');
  };

  // 회원 탈퇴
  const handleDelete = async () => {
    const isDelete = window.confirm('회원을 탈퇴하시겠습니까?');

    if (isDelete) {
      try {
        const userId = currentUser.userId; // 현재 사용자 ID
        const token = localStorage.getItem('token'); // 토큰 가져오기

        console.log('userId:', userId);
        console.log('Token:', token);

        // DELETE 요청에 Authorization 헤더 추가
        await axios.delete(`http://localhost:8000/user/${userId}`, {
          headers: {
            Authorization: token,
          },
        });

        dispatch(deleteUser()); // Redux 상태 업데이트 (회원 삭제 처리)
        // 토큰 제거
        localStorage.removeItem('token');
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
          const newProfileImageFile = images[0]; // 선택된 이미지 파일
          console.log('newProfileImage >>>', newProfileImageFile);

          // 로컬 스토리지에서 토큰 가져오기
          const token = localStorage.getItem('token');

          // FormData 객체 생성
          const formData = new FormData();
          formData.append('profileImage', newProfileImageFile); // 파일을 FormData에 추가
          console.log('formData >>', formData);

          await axios.post(
            `http://localhost:8000/uploadImg/user/${userId}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data', // 헤더 설정
                Authorization: token,
              },
            },
          );

          // 프로필 이미지 업데이트
          dispatch(
            setUserField({ field: 'profileImage', value: newProfileImageFile }),
          );
          setProfileEdit(false);
          console.log('프로필 수정 성공');
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
    setImages([originalProfileImage]); // 원래 프로필 이미지로 상태 복원
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
      // sells={sells}
      // buys={buys}
    />
  );
};

export default MyPageContainer;
