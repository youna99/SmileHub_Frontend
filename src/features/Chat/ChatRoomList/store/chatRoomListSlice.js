import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 목데이터용 주석 처리
  // rooms: [
  //   {
  //     roomId: 'room1',
  //     productName: '자전거 팝니다.',
  //     lastMessage: '언제 가능하신가요?',
  //   },
  //   {
  //     roomId: 'room2',
  //     productName: '옷 팔아요.',
  //     lastMessage: '안팔아요!',
  //   },
  //   {
  //     roomId: 'room3',
  //     productName: '컴퓨터 팔아요.',
  //     lastMessage: '8시에 봬요!',
  //   },
  // ],
  rooms: [], // 서버 연결용: 초기에는 빈 배열로 설정
};

const chatRoomListSlice = createSlice({
  name: 'chatRoomList',
  initialState,
  reducers: {
    setRooms(state, action) {
      state.rooms = action.payload;
    },
    updateLastMessage(state, action) {
      const { roomId, lastMessage } = action.payload;
      const roomIndex = state.rooms.findIndex((room) => room.roomId === roomId);
      const room = state.rooms.find((room) => room.roomId === roomId);

      if (room) {
        room.lastMessage = lastMessage;
      }

      // 채팅방 위치 변경
      if (roomIndex > -1) {
        // 해당 채팅방의 마지막 메시지 업데이트
        const updatedRoom = { ...state.rooms[roomIndex], lastMessage };

        // 해당 채팅방을 리스트 맨 위로 이동
        state.rooms.splice(roomIndex, 1);
        state.rooms.unshift(updatedRoom);
      }
    },
  },
});

export const { setRooms, updateLastMessage } = chatRoomListSlice.actions;
export default chatRoomListSlice.reducer;
