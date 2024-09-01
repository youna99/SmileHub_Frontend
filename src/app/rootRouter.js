import { Route, Router, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import RegisterContainer from '../features/User/Register/container/RegisterContainer';
import MyPage from '../pages/User/MyPage';
import { LoginContainer } from '../features/User/login/container/LoginContainer';

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};
