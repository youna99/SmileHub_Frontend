import React from 'react';

export const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  showCancelButton = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 h-auto flex flex-col justify-center">
        <p className="text-center mt-2 mb-6">{message}</p>

        {/* 버튼 영역 */}
        <div className="mt-4 flex justify-center space-x-4">
          {/* showCancelButton이 true일 때만 취소 버튼을 표시 */}
          {showCancelButton && (
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              취소
            </button>
          )}
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
