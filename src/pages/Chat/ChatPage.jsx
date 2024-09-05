import React, { useState } from 'react';
import ChatRoomContainer from '../../features/Chat/ChatRoom/container/ChatRoomContainer';
import ChatRoomListContainer from '../../features/Chat/ChatRoomList/container/ChatRoomListContainer';
import './ChatPage.css'; // 프라이버시 보호 오버레이

const ChatPage = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  const handleStartChat = () => {
    setShowOverlay(false);
  };

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
        <ChatRoomListContainer />
      </div>

      {/* 우측 1:1 채팅 */}
      <div className="w-3/4 p-4">
        <ChatRoomContainer />
      </div>
    </div>
  );
};

export default ChatPage;
