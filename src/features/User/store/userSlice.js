import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [], // 기존 등록 사용자의 목록
  // 현재 사용 중인 사용자 정보
  currentUser: {
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    age: '',
    gender: '',
    address: {
      postcode: '', // 우편번호
      address: '', // 기본주소 ex) 경기 성남시 분당구 판교역로 166
      detailAddress: '', // 상세 주소 (예: 아파트 동, 호수)
      extraAddress: '', // 참고항목 (예: 법정동, 건물명)
    },
  },
  isAuthenticated: false, // 로그인 여부
  error: null,
};

// 슬라이스 생성
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 업데이트된 필드만 관리
    setUserField: (state, action) => {
      const { field, value } = action.payload;
      console.log('field >>>', field);
      console.log('value >>>', value);

      // 'address.'로 시작하는 필드인지 확인
      if (field.startsWith('address.')) {
        // 'address.' 이후의 부분을 추출하여 address 객체의 특정 필드를 가리킴
        const addressField = field.split('.')[1];
        console.log('addressField >>>', addressField);

        state.currentUser.address[addressField] = value;
      } else {
        // 'address.'가 아닌 다른 필드일 경우 currentUser 객체의 해당 필드를 업데이트
        state.currentUser[field] = value;
      }
    },

    registerUser: (state) => {
      // 현재 회원가입페이지에서 작성한 이메일값이 users에 존재하는지 확인
      const exists = state.users.find(
        (user) => user.email === state.currentUser.email,
      );
      // 새로운 사용자 등록
      // 만약 중복된 이메일 없으면 currentUser 정보를 users 배열에 추가
      // 추가 후 currentUser를 빈 값으로 초기화
      if (!exists) {
        state.users.push({ ...state.currentUser });
        state.currentUser = {
          email: '',
          password: '',
          confirmPassword: '',
          nickname: '',
          age: '',
          gender: '',
          address: {
            postcode: '',
            address: '',
            detailAddress: '',
            extraAddress: '',
          },
        };
        state.error = null;
      } else {
        state.error = 'Email already exists';
      }
    },

    // 이메일과 비밀번호로 로그인
    loginUser: (state, action) => {
      const user = state.users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password,
      );
      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.isAuthenticated = false;
        state.error = 'Invalid email or password';
      }
    },

    // 현재 사용자 정보 초기화
    logout: (state) => {
      state.currentUser = {
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        age: '',
        gender: '',
        address: {
          postcode: '',
          address: '',
          detailAddress: '',
          extraAddress: '',
        },
      };
      state.isAuthenticated = false;
    },
  },
});

export const { setUserField, registerUser, loginUser, logout } =
  userSlice.actions;
export default userSlice.reducer;
