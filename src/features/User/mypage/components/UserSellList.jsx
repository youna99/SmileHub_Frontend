import React, { useEffect } from 'react';
import { Button, Avatar } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';

const UserSellList = () => {
  const [sells, setSells] = useState([]); // 판매내역 상태관리
  console.log('sells >>>', sells);

  // 판매내역 불러오기
  const fetchSellsList = async () => {
    const token = localStorage.getItem('token'); // 토큰 가져오기
    try {
      const res = await axios.post(
        'http://localhost:8000/mypage',
        {
          mypageList: 'sell',
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      console.log('res', res);

      setSells(res.data);
    } catch (error) {
      console.error('판매내역 불러오기 오류', error);
    }
  };

  useEffect(() => {
    fetchSellsList();
  }, []);

  // 수락버튼 클릭
  const handleAcceptSell = async (productId) => {
    const token = localStorage.getItem('token'); // 토큰 가져오기
    try {
      const res = await axios.post(
        'http://localhost:8000/mypage/issell',
        {
          productId,
          status: 'yes',
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (res.status === 200) {
        fetchSellsList();
      }
    } catch (error) {
      console.error('수락 버튼 클릭 오류', error);
    }
  };

  // 거절버튼 클릭
  const handleRejectSell = async (productId) => {
    const token = localStorage.getItem('token'); // 토큰 가져오기
    try {
      const res = await axios.post(
        'http://localhost:8000/mypage/issell',
        {
          productId,
          status: 'no',
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (res.status === 200) {
        fetchSellsList();
      }
    } catch (error) {
      console.error('거절버튼 클릭 오류', error);
    }
  };

  // 발송 완료 클릭
  const handleCompleteSell = async (productId) => {
    const token = localStorage.getItem('token'); // 토큰 가져오기
    try {
      const res = await axios.post(
        'http://localhost:8000/mypage/issell',
        {
          productId,
          status: 'send',
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (res.status === 200) {
        fetchSellsList();
      }
    } catch (error) {
      console.error('발송 완료 버튼 클릭 오류', error);
    }
  };

  return (
    <>
      <section className="border-b border-gray-200">
        <div className="flex flex-col p-4">
          {sells.length > 0 ? (
            sells.map((sell) => (
              <div key={sell.productId} className="flex items-center mb-4">
                <Avatar
                  img={sell.img}
                  size="lg"
                  className="flex items-center justify-center rounded-lg"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg">{sell.productName}</h2>
                  <p className="text-xl font-bold text-gray-800 mt-1">
                    {sell.price}원
                  </p>
                  <p>{sell.status}</p>
                </div>
                {sell.status === '판매중' && (
                  <div className="flex flex-col space-y-2">
                    <Button
                      color="gray"
                      className="mr-2"
                      onClick={() => handleAcceptSell(sell.productId)}
                    >
                      수락
                    </Button>
                    <Button
                      color="gray"
                      onClick={() => handleRejectSell(sell.productId)}
                    >
                      거절
                    </Button>
                  </div>
                )}
                {sell.status === '배송대기중' && (
                  <Button
                    color="gray"
                    onClick={() => handleCompleteSell(sell.productId)}
                  >
                    발송 완료
                  </Button>
                )}
              </div>
            ))
          ) : (
            <p>판매 내역이 없습니다.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default UserSellList;
