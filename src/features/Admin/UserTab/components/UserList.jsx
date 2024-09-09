import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserStatus, removeUser } from '../store/userTabSlice';
import { Modal } from '../../../../shared/Modal';

const UserList = ({ searchResults }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null); // 상태 변경인지 강퇴인지 구분
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    console.log('유저 상태가 업데이트 되었습니다.', searchResults); // 상태 변경 확인
  }, [searchResults]);

  const handleStatusChange = (id, currentStatus) => {
    const newStatus = currentStatus === '활동중' ? '활동정지' : '활동중';
    setSelectedUser(id);
    setSelectedAction({
      type: 'status',
      newStatus: newStatus,
    });
    setIsModalOpen(true);
  };

  const handleRemove = (id) => {
    setSelectedUser(id);
    setSelectedAction({ type: 'remove' });
    setIsModalOpen(true);
  };

  // 모달에서 확인 버튼 눌렀을 때 실행
  const handleConfirm = () => {
    if (selectedAction.type === 'status') {
      dispatch(
        updateUserStatus({
          id: selectedUser,
          status: selectedAction.newStatus,
        }),
      );
    } else if (selectedAction.type === 'remove') {
      dispatch(removeUser(selectedUser));
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center align-middle">유저번호</th>
            <th className="px-4 py-2 text-center align-middle">닉네임</th>
            <th className="px-4 py-2 text-center align-middle">이메일</th>
            <th className="px-4 py-2 text-center align-middle">주소</th>
            <th className="px-4 py-2 text-center align-middle">가입일</th>
            <th className="px-4 py-2 text-center align-middle">신고수</th>
            <th className="px-4 py-2 text-center align-middle">현재상태</th>
            <th className="px-4 py-2 text-center align-middle">강퇴</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="px-4 py-2 text-center align-middle">{user.id}</td>
              <td className="px-4 py-2 text-center align-middle">
                {user.nickname}
              </td>
              <td className="px-4 py-2 text-center align-middle">
                {user.email}
              </td>
              <td className="px-4 py-2 text-center align-middle">
                <div>{`${user.address.depth1} ${user.address.depth2}`}</div>
                <div>{`${user.address.depth3} ${user.address.depth4}`}</div>
              </td>
              <td className="px-4 py-2 text-center align-middle">
                {user.joinedDate}
              </td>
              <td className="px-4 py-2 text-center align-middle">
                {user.reports}
              </td>
              <td className="px-4 py-2 text-center align-middle">
                <button
                  onClick={() => handleStatusChange(user.id, user.status)}
                  className={`py-1 px-3 rounded-md text-white cursor-pointer ${user.status === '활동중' ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{
                    display: 'inline-block',
                    minWidth: '90px',
                    textAlign: 'center',
                  }}
                >
                  {user.status}
                </button>
              </td>
              <td className="px-4 py-2 text-center align-middle">
                <button
                  onClick={() => handleRemove(user.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                >
                  강퇴
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
            : '정말 강퇴하시겠습니까?'
        }
      />
    </div>
  );
};

export default UserList;
