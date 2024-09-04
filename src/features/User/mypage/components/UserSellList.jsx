import React from 'react';
import { Button } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { updateSellsStatus, updateBuysStatus } from '../../store/myPageSlice';
import UserProductsList from './UserProductsList';

const UserSellList = ({ sell }) => {
  const dispatch = useDispatch();

  // 판매자: 결제 후 수락 -> 배송 대기중
  const handleAcceptSell = (productId) => {
    dispatch(updateSellsStatus({ productId, newStatus: '배송 대기중' }));
  };

  // 판매자: 거절 -> 다시 판매중
  const handleRejectSell = (productId) => {
    dispatch(updateSellsStatus({ productId, newStatus: '판매중' }));
  };

  // 판매자: 발송 완료 -> 배송중
  const handleCompleteSell = (productId) => {
    dispatch(updateSellsStatus({ productId, newStatus: '배송중' }));
    dispatch(updateBuysStatus({ productId, newStatus: '배송중' }));

    // 10초 후 배송중 상태가 배송완료로 변경
    setTimeout(() => {
      dispatch(updateSellsStatus({ productId, newStatus: '배송 완료' }));
      dispatch(updateBuysStatus({ productId, newStatus: '배송 완료' }));
    }, 10000);
  };

  const buttons = (
    <>
      {sell.status === '판매중' && sell.isPayment ? (
        <>
          <Button
            color="gray"
            className="mr-2"
            onClick={() => handleAcceptSell(sell.productId)}
          >
            수락
          </Button>
          <Button color="gray" onClick={() => handleRejectSell(sell.productId)}>
            거절
          </Button>
        </>
      ) : (
        sell.status === '배송 대기중' && (
          <Button
            color="gray"
            className="mr-2"
            onClick={() => handleCompleteSell(sell.productId)}
          >
            발송 완료
          </Button>
        )
      )}
    </>
  );

  return <UserProductsList product={sell} buttons={buttons} />;
};

export default UserSellList;
