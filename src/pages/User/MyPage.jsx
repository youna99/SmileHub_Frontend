import React from 'react';
import { Avatar, Tabs } from 'flowbite-react';
import '../../features/User/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const MyPage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  return (
    <>
      <main className="flex justify-center py-10 w-full">
        <div className="flex items-center space-x-4 w-full max-w-3xl border p-6 bg-gray-200 mx-auto">
          <Avatar img={`${process.env.PUBLIC_URL}/포차코 공룡.jpg`} size="xl" />
          <div className="space-y-2 pl-8">
            <div className="text-2xl font-bold">{currentUser.nickname}</div>
            <div className="text-lg text-gray-700">{currentUser.temp}</div>
          </div>
        </div>
      </main>
      <nav>
        <div className="overflow-x-auto flex justify-center w-full">
          <Tabs
            aria-label="Full width tabs"
            variant="fullWidth"
            className="flex items-center w-full max-w-3xl mx-auto"
          >
            <Tabs.Item active title="찜 목록">
              <span className="font-medium text-gray-800 dark:text-white">
                Profile tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </Tabs.Item>
            <Tabs.Item title="판매내역">
              <span className="font-medium text-gray-800 dark:text-white">
                Dashboard tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </Tabs.Item>
            <Tabs.Item title="구매내역">
              <span className="font-medium text-gray-800 dark:text-white">
                Settings tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </Tabs.Item>
            <Tabs.Item title="내 정보 수정">
              {/* <span className="font-medium text-gray-800 dark:text-white">
                Contacts tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling. */}
            </Tabs.Item>
          </Tabs>
        </div>
      </nav>
    </>
  );
};

export default MyPage;
