import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChatRoom: null,
  // 목데이터용 주석 처리
  // messages: [
  //   {
  //     roomId: 'room1',
  //     senderId: '1',
  //     content: '안녕하세요!',
  //     timestamp: '2023-09-01T10:00:00Z',
  //   },
  //   {
  //     roomId: 'room2',
  //     senderId: 'seller456',
  //     content: '테스트 메시지!',
  //     timestamp: '2023-09-01T10:05:00Z',
  //   },
  //   {
  //     roomId: 'room3',
  //     senderId: '1',
  //     content: '새로운 채팅방의 메시지입니다.',
  //     timestamp: '2023-09-01T10:10:00Z',
  //   },
  // ],
  messages: [],
};

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    setCurrentChatRoom(state, action) {
      state.currentChatRoom = action.payload; // 선택된 채팅방 저장
    },
    addMessage(state, action) {
      state.messages.push(action.payload); // 새 메시지 추가
    },
    setMessages(state, action) {
      state.messages = action.payload; // 서버로부터 받은 메시지 목록 설정
    },
  },
});

export const { setCurrentChatRoom, addMessage, setMessages } =
  chatRoomSlice.actions;
export default chatRoomSlice.reducer;
