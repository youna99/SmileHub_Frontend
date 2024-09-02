import React from 'react';
import { Avatar, Button } from 'flowbite-react';

const UserProductsList = ({
  productName,
  price,
  address,
  status,
  onConfirm,
  onReject,
  isSold, // 판매 내역인지 구매 내역인지 구분
  imgSrc,
}) => {
  return (
    <section className="border-b border-gray-200">
      <div className="flex items-center p-4">
        <Avatar
          img={imgSrc}
          size="lg"
          className="flex items-center justify-center rounded-lg"
        />
        <div className="ml-4 flex-1">
          <h2 className="text-lg">{productName}</h2>
          <p className="text-gray-400 text-sm">{address}</p>
          <p className="text-xl font-bold text-gray-800 mt-1">{price}원</p>
        </div>
        <p>{status}</p>
      </div>
      <div className="flex justify-end mb-2">
        {isSold ? (
          <>
            <Button color="gray" className="mr-2" onClick={onConfirm}>
              상품 확인 완료
            </Button>
            <Button color="gray" onClick={onReject}>
              거절
            </Button>
          </>
        ) : (
          <>
            <Button color="gray" className="mr-2" onClick={onConfirm}>
              판매 수락
            </Button>
            <Button color="gray" onClick={onReject}>
              판매 거절
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default UserProductsList;
