import React, { useEffect, useState } from 'react';
import { Avatar, Button } from 'flowbite-react';
import UserSellList from '../../features/User/mypage/components/UserSellList';
import UserBuyList from '../../features/User/mypage/components/UserBuyList';
import LikeList from '../../features/User/mypage/components/LikeList';
import MoneyMoal from '../../features/User/mypage/components/MoneyMoal';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserField } from '../../features/User/store/userSlice';

const MyPage = ({
  currentUser,
  handleEdit,
  handleDelete,
  isModalOpen,
  openModal,
  closeModal,
}) => {
  const [activeTab, setActiveTab] = useState('찜 목록'); // 기본 활성 탭 설정
  const [profileEdit, setProfileEdit] = useState(false); // 수정 상태관리
  const [image, setImage] = useState(null); // 사용자가 업로드할 이미지 상태관리

  const dispatch = useDispatch();

  // 컴포넌트가 마운트될 때 프로필 이미지를 저장
  // useEffect(() => {
  //   setOriginalProfileImage(currentUser.profileImage);
  // }, [currentUser.profileImage]);

  // 파일 업로드 input에 넣은 이미지
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // 업로드 버튼 클릭
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('profileImg', image);

    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        `http://localhost:8000/uploadImg/user/${currentUser.userId}`,
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      dispatch(
        setUserField({ field: 'profileImage', value: res.data.profileImgUrl }),
      );
      console.log('res.data.imageUrl', res.data.profileImgUrl);

      setProfileEdit(false);
    } catch (error) {
      console.error('이미지 업로드 중 에러', error);
    }
  };

  // 프로필 수정버튼 클릭
  const handleProfileClick = () => {
    setProfileEdit(true);
  };

  // 프로필 수정 중 취소버튼 클릭
  const handleCancel = () => {
    setProfileEdit(false);
    setImage(null);
  };

  return (
    <>
      <section className="flex justify-center py-10 w-full">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-3xl border p-6 bg-gray-200 mx-auto rounded-lg">
          <div className="flex flex-col items-center">
            {profileEdit ? (
              // 수정 상태일 때: 이미지 업로드 폼 및 버튼
              <form onSubmit={handleSubmit}>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="mb-4"
                />
                <div className="flex space-x-2 mt-3">
                  <Button type="submit">업로드</Button>
                  <Button onClick={handleCancel}>취소</Button>
                </div>
              </form>
            ) : (
              // 수정 상태가 아닐 때: 프로필 이미지 및 수정하기 버튼
              <>
                <Avatar
                  img={
                    currentUser.profileImage
                      ? currentUser.profileImage
                      : '/images/profile.png'
                  }
                  size="xl"
                />
                <Button onClick={handleProfileClick} className="mt-3">
                  프로필 수정하기
                </Button>
              </>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-between pl-0 sm:pl-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <div className="mb-2 sm:mb-0">
                <div className="text-2xl font-bold pb-1">
                  {currentUser.nickname}
                </div>
                <div className="text-lg text-gray-700">{currentUser.temp}</div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleEdit}>내 정보 수정</Button>
                <Button onClick={handleDelete}>회원 탈퇴</Button>
              </div>
            </div>
            <div className="border bg-white rounded-lg p-4 mt-4 w-full">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-2 sm:mb-0">
                  현재 머니: {currentUser.money}
                </div>
                <Button className="w-full sm:w-auto" onClick={openModal}>
                  충전하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav>
        <div className="flex justify-center w-full">
          <div className="flex items-center w-full max-w-3xl mx-auto border-b border-gray-500">
            <div
              onClick={() => setActiveTab('찜 목록')}
              className={`cursor-pointer flex items-center justify-center w-full py-4 px-6 text-center transition-colors duration-200 ${activeTab === '찜 목록' ? 'border-4 border-[#FEE715]' : 'border-b-4 border-transparent'}`}
            >
              <span className="font-semibold">찜 목록</span>
            </div>
            <div
              onClick={() => {
                setActiveTab('판매 내역');
              }}
              className={`cursor-pointer flex items-center justify-center w-full py-4 px-6 text-center transition-colors duration-200 ${activeTab === '판매 내역' ? 'border-4 border-[#FEE715]' : 'border-b-4 border-transparent'}`}
            >
              <span className="font-semibold">판매 내역</span>
            </div>
            <div
              onClick={() => setActiveTab('구매 내역')}
              className={`cursor-pointer flex items-center justify-center w-full py-4 px-6 text-center transition-colors duration-200 ${activeTab === '구매 내역' ? 'border-4 border-[#FEE715]' : 'border-b-4 border-transparent'}`}
            >
              <span className="font-semibold">구매 내역</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full max-w-3xl mx-auto">
          <div className="py-8 mt-10">
            {activeTab === '찜 목록' && <LikeList />}
            {activeTab === '판매 내역' && <UserSellList />}
            {activeTab === '구매 내역' && <UserBuyList />}
          </div>
        </div>
      </nav>

      {/* MoneyMoal 컴포넌트 추가 */}
      <MoneyMoal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default MyPage;
