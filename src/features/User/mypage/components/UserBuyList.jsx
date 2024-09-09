import React, { useEffect, useState } from 'react';
import { Button, Avatar } from 'flowbite-react';
import axios from 'axios';

const UserBuyList = () => {
  const [buys, setBuys] = useState(''); // 구매내역 상태 관리

  // 구매내역 불러오기
  const fetchBuysList = async () => {
    const token = localStorage.getItem('token'); // 토큰 가져오기
    try {
      const res = await axios.post(
        'http://localhost:8000/mypage',
        {
          mypageList: 'buy',
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      console.log('res', res);

      setBuys(res.data);
    } catch (error) {
      console.error('구매내역 불러오기 오류', error);
    }
  };

  useEffect(() => {
    fetchBuysList();
  }, []);

  // 상품 확인 완료 버튼 클릭
  const handleConfirmDelivery = async (productId, userId) => {
    const token = localStorage.getItem('token'); // 토큰 가져오기
    try {
      const res = await axios.post(
        'http://localhost:8000/mypage/check',
        {
          productId,
          status: 'yes',
          userId,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (res.status === 200) {
        fetchBuysList();
      }
    } catch (error) {
      console.error('상품 확인 완료 버튼 클릭 오류', error);
    }
  };

  // 거절 버튼 클릭
  const handleRejectBuy = async (productId, userId) => {
    const token = localStorage.getItem('token'); // 토큰 가져오기
    try {
      const res = await axios.post(
        'http://localhost:8000/mypage/check',
        {
          productId,
          status: 'no',
          userId,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (res.status === 200) {
        fetchBuysList();
      }
    } catch (error) {
      console.error('거절 버튼 클릭 오류', error);
    }
  };

  return (
    <section className="border-b border-gray-200">
      <div className="flex flex-col p-4">
        {buys.length > 0 ? (
          buys.map((buy) => (
            <div key={buy.productId} className="flex items-center mb-4">
              <Avatar
                img={buy.img}
                size="lg"
                className="flex items-center justify-center rounded-lg"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg">{buy.productName}</h2>
                <p className="text-xl font-bold text-gray-800 mt-1">
                  {buy.price}원
                </p>
                <p>{buy.status}</p>
              </div>

              {buy.status === '배송완료' && (
                <>
                  <Button
                    color="gray"
                    className="mr-2"
                    onClick={() =>
                      handleConfirmDelivery(buy.productId, buy.userId)
                    }
                  >
                    상태확인 완료
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => handleRejectBuy(buy.productId, buy.userId)}
                  >
                    거절
                  </Button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>구매 내역이 없습니다.</p>
        )}
      </div>
    </section>
  );
};

export default UserBuyList;
