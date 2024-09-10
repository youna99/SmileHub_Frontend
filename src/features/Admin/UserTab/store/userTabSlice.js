import { createSlice } from '@reduxjs/toolkit';

// 초기 상태
const initialState = {
  // users: [
  //   {
  //     id: 1,
  //     nickname: 'user1',
  //     email: 'user1@example.com',
  //     address: {
  //       depth1: '서울특별시',
  //       depth2: '영등포구',
  //       depth3: '문래동',
  //       depth4: '청년사관학교',
  //     },
  //     joinedDate: '2023-01-01',
  //     reports: 0,
  //     status: '활동중',
  //   },
  //   {
  //     id: 2,
  //     nickname: 'user2',
  //     email: 'user2@example.com',
  //     address: {
  //       depth1: '부산광역시',
  //       depth2: '해운대구',
  //       depth3: '우동',
  //       depth4: '해운대 센텀시티',
  //     },
  //     joinedDate: '2023-02-01',
  //     reports: 2,
  //     status: '활동정지',
  //   },
  // ],
  users: [],
  loading: false,
  error: null,
};

const userTabSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    updateUserStatus: (state, action) => {
      const { userId, status } = action.payload;
      const user = state.users.find((user) => user.userId === userId);
      if (user) {
        user.status = status; // 상태업데이트 (활동중 / 활동정지)
      }
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(
        (user) => user.userId !== action.payload,
      );
    },
  },
});

export const { setUsers, updateUserStatus, removeUser } = userTabSlice.actions;
export default userTabSlice.reducer;
