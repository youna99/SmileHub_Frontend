import React from 'react';
import UserProductsList from './UserProductsList';

const UserBuyList = () => {
  return (
    <UserProductsList
      productName="닌텐도 스위치"
      price="61,800"
      address="서울시 강남구"
      status="배송 중"
      isSold={true}
      imgSrc="product_image_url"
    />
  );
};

export default UserBuyList;
