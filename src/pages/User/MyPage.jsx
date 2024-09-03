import React, { useState, useEffect } from 'react';
import { Avatar, Tabs, Button } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserSellList from '../../features/User/mypage/components/UserSellList';
import UserBuyList from '../../features/User/mypage/components/UserBuyList';
import LikeList from '../../features/User/mypage/components/LikeList';
import { deleteUser, setUserField } from '../../features/User/store/userSlice';
import axios from 'axios';
import { ImageDropZone } from '../../shared/ImageDropZone';

const MyPage = () => {
  const [images, setImages] = useState([]); // 이미지 상태 관리
  const [profileEdit, setProfileEdit] = useState(false); // 프로필 수정 상태 관리
  const [originalProfileImage, setOriginalProfileImage] = useState(''); // 원본 프로필 이미지 저장
  const currentUser = useSelector((state) => state.user.currentUser);
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
          await axios.patch(`http://localhost:8000/user/${userId}`, {
            profile_image: newProfileImage,
          });

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
    <>
      <section className="flex justify-center py-10 w-full">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-3xl border p-6 bg-gray-200 mx-auto">
          <div className="flex flex-col items-center">
            {profileEdit ? (
              <ImageDropZone images={images} setImages={setImages} />
            ) : (
              <Avatar img={images[0] || currentUser.profile_image} size="xl" />
            )}
            <div className="flex space-x-2 mt-3">
              <Button onClick={handleProfileClick}>
                {profileEdit ? '수정 완료' : '프로필 수정하기'}
              </Button>
              {profileEdit && <Button onClick={handleCancel}>취소</Button>}
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between pl-0 sm:pl-8">
            <div>
              <div className="text-2xl font-bold pb-3">
                {currentUser.nickname}
              </div>
              <div className="text-lg text-gray-700">{currentUser.temp}</div>
            </div>
            <div className="self-start sm:self-end mt-4 sm:mt-0">
              <Button onClick={handleEdit} className="mb-2">
                내 정보 수정
              </Button>
              <Button onClick={handleDelete}>회원 탈퇴</Button>
            </div>
          </div>
        </div>
      </section>

      <nav>
        <div className="overflow-x-auto flex justify-center w-full">
          <Tabs
            aria-label="Full width tabs"
            variant="fullWidth"
            className="flex items-center w-full max-w-3xl mx-auto"
          >
            <Tabs.Item active title="찜 목록">
              <LikeList />
            </Tabs.Item>
            <Tabs.Item title="판매내역">
              <div className="flex flex-wrap">
                <div className="w-full sm:w-1/2 p-2">
                  <UserSellList />
                </div>
                <div className="w-full sm:w-1/2 p-2">
                  <UserSellList />
                </div>
                <div className="w-full sm:w-1/2 p-2">
                  <UserSellList />
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item title="구매내역">
              <div className="flex flex-wrap">
                <div className="w-full sm:w-1/2 p-2">
                  <UserBuyList />
                </div>
                <div className="w-full sm:w-1/2 p-2">
                  <UserBuyList />
                </div>
                <div className="w-full sm:w-1/2 p-2">
                  <UserBuyList />
                </div>
              </div>
            </Tabs.Item>
          </Tabs>
        </div>
      </nav>
    </>
  );
};

export default MyPage;
