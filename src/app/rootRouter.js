import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import PostProductPage from '../features/Product/PostProduct/container/PostProductPage';
import RegisterContainer from '../features/User/Register/container/RegisterContainer';
import { LoginContainer } from '../features/User/login/container/LoginContainer';
import UserEditContainer from '../features/User/mypage/container/UserEditContainer';
import MyPageContainer from '../features/User/mypage/container/MyPageContainer';
import Header from '../shared/Header';

export const RootRouter = () => {
  const location = useLocation();

  // 헤더를 표시할 경로를 정의합니다.
  const showHeaderPaths = ['/', '/mypage', '/postproduct'];
  return (
    <>
      {showHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="/mypage" element={<MyPageContainer />} />
        <Route path="/mypageEdit" element={<UserEditContainer />} />
        <Route path="/postproduct" element={<PostProductPage />} />
      </Routes>
    </>
  );
};
