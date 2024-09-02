import { Route, Router, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import RegisterContainer from '../features/User/Register/container/RegisterContainer';
import MyPage from '../pages/User/MyPage';
import { LoginContainer } from '../features/User/login/container/LoginContainer';
import UserEditContainer from '../features/User/mypage/container/UserEditContainer';

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/mypageEdit" element={<UserEditContainer />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};
