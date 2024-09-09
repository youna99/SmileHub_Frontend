import React from 'react';
import { Avatar, Tabs, Button } from 'flowbite-react';
import UserSellList from '../../features/User/mypage/components/UserSellList';
import UserBuyList from '../../features/User/mypage/components/UserBuyList';
import LikeList from '../../features/User/mypage/components/LikeList';
import Modal from '../../features/User/mypage/components/Modal';
import { ImageDropZone } from '../../shared/ImageDropZone';

const MyPage = ({
  profileEdit,
  images,
  setImages,
  currentUser,
  handleProfileClick,
  handleCancel,
  handleEdit,
  handleDelete,
  sells,
  buys,
  openModal,
  isModalOpen,
  closeModal,
}) => {
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
                <div className="mb-2 sm:mb-0">현재 머니: 100000</div>
                <Button className="w-full sm:w-auto" onClick={openModal}>
                  충전하기
                </Button>
                <Modal isOpen={isModalOpen} closeModal={closeModal} />
              </div>
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
                {sells.map((sell) => (
                  <div className="w-full sm:w-1/2 p-2" key={sell.productId}>
                    <UserSellList sell={sell} />
                  </div>
                ))}
              </div>
            </Tabs.Item>
            <Tabs.Item title="구매내역">
              <div className="flex flex-wrap">
                {buys.map((buy) => (
                  <div className="w-full sm:w-1/2 p-2" key={buy.productId}>
                    <UserBuyList buy={buy} />
                  </div>
                ))}
              </div>
            </Tabs.Item>
          </Tabs>
        </div>
      </nav>
    </>
  );
};

export default MyPage;
