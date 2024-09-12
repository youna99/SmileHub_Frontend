import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [], // 기존 등록 사용자의 목록
  // 현재 사용 중인 사용자 정보
  currentUser: {
    userId: '',
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    age: '',
    gender: '',
    address: {
      postcode: '', // 우편번호
      address: '', // 기본주소 (예: 경기 성남시 분당구 판교역로 166)
      detailAddress: '', // 상세 주소 (예: 아파트 동, 호수) // depth4
      extraAddress: '', // 참고항목 (예: 법정동, 건물명)
      sido: '', // depth1
      sigungu: '', // depth2
      bname: '', // depth3
    },
    profileImage: '',
    temp: '',
    money: 0,
    isActive: false, // 활동 정지 여부
    isAdmin: false, // 관리자 여부
    isAuthenticated: false, // 로그인 성공 여부 추가
  },
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
      // console.log('fiedl', field);
      // console.log('value', value);

      if (field === 'profileImage') {
        state.currentUser.profileImage = value; // 프로필 이미지 업데이트
      } else if (field.startsWith('address.')) {
        // 주소 업데이트
        const [, addressField] = field.split('.');
        state.currentUser.address = {
          ...state.currentUser.address,
          [addressField]: value,
        };
      } else if (field === 'error') {
        state.error = value;
      }
      // console.log('state.currentUser.address >>> ', state.currentUser.address);
      // console.log(
      // 'state.currentUser.profileImage >>> ',
      // state.currentUser.profileImage,
      // );
    },

    setUserFields: (state, action) => {
      const updates = action.payload;
      state.currentUser = { ...state.currentUser, ...updates };
      console.log('updates >>', updates);
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
          userId: '',
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
            sido: '',
            sigungu: '',
            bname: '',
          },
          profileImage: '',
          temp: '',
          isActive: false,
          isAdmin: false,
          isAuthenticated: false,
        };
        state.error = null;
      } else {
        state.error = '이미 가입된 사용자입니다.';
      }
    },

    // 현재 사용자 정보 초기화(로그아웃)
    logout: (state) => {
      console.log('Logging out, resetting state:', state.currentUser);
      state.currentUser = {
        userId: '',
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
          sido: '',
          sigungu: '',
          bname: '',
        },
        profileImage: '',
        temp: '',
        isActive: false,
        isAdmin: false,
        isAuthenticated: false,
      };
      state.error = null;
    },

    // 회원 탈퇴
    deleteUser: (state) => {
      // 현재 로그인된 사용자의 이메일을 기준으로 users 배열에서 제거
      state.users = state.users.filter(
        (user) => user.email !== state.currentUser.email,
      );

      // currentUser 정보 초기화 및 로그아웃 처리
      state.currentUser = {
        userId: '',
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
          sido: '',
          sigungu: '',
          bname: '',
        },
        profileImage: '',
        temp: '',
        isActive: false,
        isAdmin: false,
        isAuthenticated: false,
      };
      state.error = null;
    },
    addMoney: (state, action) => {
      const amount = action.payload; // 충전할 금액
      state.currentUser.money += amount;
    },
    pay: (state, action) => {
      const amount = action.payload; // 결제할 금액
      state.currentUser.money -= amount;
    },
  },
});

export const {
  setUserField,
  setUserFields,
  registerUser,
  loginUser,
  logout,
  deleteUser,
  addMoney,
  pay,
} = userSlice.actions;
export default userSlice.reducer;
