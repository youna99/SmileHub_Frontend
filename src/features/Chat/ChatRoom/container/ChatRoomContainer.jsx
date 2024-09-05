import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatRoom from '../components/ChatRoom';
import { addMessage } from '../store/chatRoomSlice';
import { updateLastMessage } from '../../ChatRoomList/store/chatRoomListSlice';
// import useSocket from '../../hooks/useSocket';  // 소켓 연결

const ChatRoomContainer = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const currentChatRoom = useSelector((state) => state.chat.currentChatRoom);
  const messages = useSelector((state) => state.chat.messages);

  // const { socket, sendMessage, receiveMessage } = useSocket(currentChatRoom?.roomId); // 소켓 연결

  // WebSocket 메시지 수신
  useEffect(() => {
    // 소켓 연결
    //   if (socket && currentChatRoom) {
    //     receiveMessage((newMessage) => {
    //       dispatch(addMessage(newMessage));
    //       dispatch(updateLastMessage({ roomId: newMessage.roomId, lastMessage: newMessage.content }));
    //     });
    //   }
    // }, [currentChatRoom, dispatch, receiveMessage, socket]);
  }, [currentChatRoom, dispatch]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        senderId: currentUser.userId,
        roomId: currentChatRoom.roomId,
        content: message,
        timestamp: new Date().toISOString(),
      };

      // 소켓 연결
      // sendMessage(newMessage);

      // 로컬 메시지 상태 업데이트 (목데이터용)
      dispatch(addMessage(newMessage));
      dispatch(
        updateLastMessage({
          roomId: currentChatRoom.roomId,
          lastMessage: message,
        }),
      );

      setMessage('');
    }
  };

  return currentChatRoom ? (
    <ChatRoom
      // 선택된 채팅방의 메시지 필터링
      messages={messages.filter((msg) => msg.roomId === currentChatRoom.roomId)}
      message={message}
      handleInputChange={handleInputChange}
      handleKeyPress={handleKeyPress}
      handleSendMessage={handleSendMessage}
      currentUser={currentUser}
    />
  ) : (
    <div className="flex justify-center items-center h-full text-l">
      왼쪽 채팅방을 선택해주세요!
    </div>
  );
};

export default ChatRoomContainer;
