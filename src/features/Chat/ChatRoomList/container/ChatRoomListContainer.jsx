import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatRoomList from '../components/ChatRoomList';
import { setCurrentChatRoom } from '../../ChatRoom/store/chatRoomSlice';

const ChatRoomListContainer = () => {
  const dispatch = useDispatch();
  const chatRooms = useSelector((state) => state.chatRoomList.rooms);

  const handleSelectRoom = (roomId) => {
    const selectedRoom = chatRooms.find((room) => room.roomId === roomId);
    dispatch(setCurrentChatRoom(selectedRoom));
  };

  return (
    <ChatRoomList chatRooms={chatRooms} handleSelectRoom={handleSelectRoom} />
  );
};

export default ChatRoomListContainer;
