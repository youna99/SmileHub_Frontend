import React from 'react';
import { Avatar, Tabs, Button } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserSellList from '../../features/User/mypage/components/UserSellList';
import UserBuyList from '../../features/User/mypage/components/UserBuyList';
import LikeList from '../../features/User/mypage/components/LikeList';

const MyPage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/mypageEdit');
  };
  return (
    <>
      <section className="flex justify-center py-10 w-full">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-3xl border p-6 bg-gray-200 mx-auto">
          <Avatar img={currentUser.avatarUrl || ''} size="xl" />
          <div className="flex flex-1 flex-col justify-between pl-0 sm:pl-8">
            <div>
              <div className="text-2xl font-bold pb-3">
                {currentUser.nickname}
              </div>
              <div className="text-lg text-gray-700">{currentUser.temp}</div>
            </div>
            <div className="self-start sm:self-end mt-4 sm:mt-0">
              <Button color="gray" onClick={handleEdit}>
                내 정보 수정
              </Button>
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
