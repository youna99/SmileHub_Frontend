import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProductStatus, removeProduct } from '../store/productTabSlice';
import { Modal } from '../../../../shared/Modal';

const ProductList = ({ searchResults }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null); // 상태인지 삭제인지 구분
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleStatusChange = (id, currentStatus) => {
    const newStatus = currentStatus === '판매중' ? '판매완료' : '판매중';
    setSelectedProduct(id);
    setSelectedAction({
      type: 'status',
      newStatus: newStatus,
    });
    setIsModalOpen(true);
  };

  const handleRemove = (id) => {
    setSelectedProduct(id);
    setSelectedAction({ type: 'remove' });
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (selectedAction.type === 'status') {
      dispatch(
        updateProductStatus({
          id: selectedProduct,
          status: selectedAction.newStatus,
        }),
      );
    } else if (selectedAction.type === 'remove') {
      dispatch(removeProduct(selectedProduct));
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center align-middle">상품번호</th>
            <th className="px-4 py-2 text-center align-middle">상품명</th>
            <th className="px-4 py-2 text-center align-middle">가격</th>
            <th className="px-4 py-2 text-center align-middle">판매자</th>
            <th className="px-4 py-2 text-center align-middle">등록일</th>
            <th className="px-4 py-2 text-center align-middle">신고수</th>
            <th className="px-4 py-2 text-center align-middle">현재상태</th>
            <th className="px-4 py-2 text-center align-middle">삭제</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="px-4 py-2 text-center align-middle">
                {product.id}
              </td>
              <td className="px-4 py-2 text-center align-middle">
                {product.name}
              </td>
              <td className="px-4 py-2 text-center align-middle">
                {product.price}
              </td>
              <td className="px-4 py-2 text-center align-middle">
                {product.seller}
              </td>
              <td className="px-4 py-2 text-center align-middle">
                {product.createdAt}
              </td>
              <td className="px-4 py-2 text-center align-middle">
                {product.reports}
              </td>
              <td className="px-4 py-2 text-center align-middle">
                <button
                  onClick={() => handleStatusChange(product.id, product.status)}
                  className={`py-1 px-3 rounded-md text-white cursor-pointer ${product.status === '판매중' ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{
                    display: 'inline-block',
                    minWidth: '90px',
                    textAlign: 'center',
                  }}
                >
                  {product.status}
                </button>
              </td>
              <td className="px-4 py-2 text-center align-middle">
                <button
                  onClick={() => handleRemove(product.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        message={
          selectedAction?.type === 'status'
            ? '정말 상태를 변경하시겠습니까?'
            : '정말 삭제하시겠습니까?'
        }
      />
    </div>
  );
};

export default ProductList;
