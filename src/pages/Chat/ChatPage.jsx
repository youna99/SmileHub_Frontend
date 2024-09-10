import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatRoomContainer from '../../features/Chat/ChatRoom/container/ChatRoomContainer';
import ChatRoomListContainer from '../../features/Chat/ChatRoomList/container/ChatRoomListContainer';
import './ChatPage.css'; // 프라이버시 보호 오버레이

const ChatPage = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const { roomId } = useParams();

  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const handleStartChat = () => {
    setShowOverlay(false);
  };

  // roomId가 변경될 때 선택된 채팅방 설정
  useEffect(() => {
    if (roomId) {
      setSelectedRoomId(roomId);
    }
  }, [roomId]);

  return (
    <div className="flex h-screen relative">
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>프라이버시 보호</h2>
            <button onClick={handleStartChat} className="start-chat-button">
              채팅 시작
            </button>
          </div>
        </div>
      )}

      {/* 좌측 채팅방 리스트 */}
      <div className="w-1/4 border-r p-4">
        <ChatRoomListContainer onSelectRoom={setSelectedRoomId} />
      </div>

      {/* 우측 1:1 채팅 */}
      <div className="w-3/4 p-4">
        <ChatRoomContainer selectedRoomId={selectedRoomId} />
      </div>
    </div>
  );
};

export default ChatPage;
