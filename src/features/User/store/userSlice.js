import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [], // 기존 등록 사용자의 목록
  // users: [{ email: 'happy@naver.com', password: 'qwer1234' }],
  // 현재 사용 중인 사용자 정보
  // currentUser: {
  //   userId: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  //   nickname: '',
  //   age: '',
  //   gender: '',
  //   address: {
  //     postcode: '', // 우편번호
  //     address: '', // 기본주소 (예: 경기 성남시 분당구 판교역로 166)
  //     detailAddress: '', // 상세 주소 (예: 아파트 동, 호수) // depth4
  //     extraAddress: '', // 참고항목 (예: 법정동, 건물명)
  //     sido: '', // depth1
  //     sigungu: '', // depth2
  //     bname: '', // depth3
  //   },
  //   profile_image: '',
  // },
  currentUser: {
    userId: '1',
    email: 'happy@naver.com',
    password: 'qwer1234',
    confirmPassword: 'qwer1234',
    nickname: '기쁨이',
    age: '12',
    gender: '',
    address: {
      postcode: '07371', // 우편번호
      address: '서울 영등포구 경인로 702', // 기본주소 (예: 경기 성남시 분당구 판교역로 166)
      detailAddress: '2층', // 상세 주소 (예: 아파트 동, 호수) // depth4
      extraAddress: '문래동1가', // 참고항목 (예: 법정동, 건물명)
      sido: '서울', // depth1
      sigungu: '영등포구', // depth2
      bname: '문래동1가', // depth3
    },
    profile_image: '',
    temp: '36.5',
  },
  isAuthenticated: false, // 로그인 여부
  isActive: false, // 활동 정지 여부
  isAdmin: false, // 관리자 여부
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
      console.log('field >>', field);
      console.log('value >>', value);

      // 'address.'로 시작하는 필드인지 확인
      if (field.startsWith('address.')) {
        // 구조 분해 할당을 사용하여 addressField 추출
        const [, addressField] = field.split('.');
        console.log('addressField', addressField);

        // 구조 분해 할당을 사용하여 address 필드 업데이트
        state.currentUser.address = {
          ...state.currentUser.address,
          [addressField]: value,
        };
      } else {
        // 'address.'가 아닌 다른 필드일 경우 currentUser 객체의 해당 필드를 업데이트
        state.currentUser = {
          ...state.currentUser,
          [field]: value,
        };
      }
      console.log('state.currentUser.address >>> ', state.currentUser.address);
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
            sido: '',
            sigungu: '',
            bname: '',
          },
        };
        state.error = null;
      } else {
        state.error = '이미 가입된 사용자입니다.';
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
        console.log('로그인 성공', user);
      } else {
        state.isAuthenticated = false;
        state.error = '이메일 또는 비밀번호가 일치하지 않습니다.';
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
          sido: '',
          sigungu: '',
          bname: '',
        },
      };
      state.isAuthenticated = false;
    },
  },
});

export const { setUserField, registerUser, loginUser, logout } =
  userSlice.actions;
export default userSlice.reducer;
