import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import RegisterContainer from '../features/User/Register/container/RegisterContainer';
import MyPage from '../pages/User/MyPage';

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};
