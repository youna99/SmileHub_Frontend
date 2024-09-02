import React from 'react';
import UserProductsList from './UserProductsList';

const UserSellList = () => {
  return (
    <UserProductsList
      productName="닌텐도 스위치"
      price="61,800"
      address="서울시 강남구"
      status="배송 중"
      isSold={false}
      imgSrc="product_image_url"
    />
  );
};

export default UserSellList;
