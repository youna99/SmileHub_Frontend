import React from 'react';
import { Button } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { updateBuysStatus, updateSellsStatus } from '../../store/myPageSlice';
import UserProductsList from './UserProductsList';
// import UserProductsList from './UserProductsList';

const UserBuyList = ({ buy }) => {
  const dispatch = useDispatch();

  // 구매자: 상품 확인 완료 -> 정산 완료
  const handleConfirmDelivery = (productId) => {
    dispatch(updateSellsStatus({ productId, newStatus: '정산 완료' }));
    dispatch(updateBuysStatus({ productId, newStatus: '정산 완료' }));
  };

  // 구매자: 거절 -> 환불완료
  const handleRejectBuy = (productId) => {
    dispatch(updateBuysStatus({ productId, newStatus: '환불 완료' }));
    dispatch(updateSellsStatus({ productId, newStatus: '환불 완료' }));
  };

  const buttons = (
    <>
      {buy.status === '배송 완료' && (
        <>
          <Button
            color="gray"
            className="mr-2"
            onClick={() => handleConfirmDelivery(buy.productId)}
          >
            상태확인 완료
          </Button>
          <Button color="gray" onClick={() => handleRejectBuy(buy.productId)}>
            거절
          </Button>
        </>
      )}
    </>
  );

  return <UserProductsList product={buy} buttons={buttons} />;
};

export default UserBuyList;
