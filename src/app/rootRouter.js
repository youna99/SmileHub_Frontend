import { Route, Router, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import PostProductPage from '../features/Product/PostProduct/container/PostProductPage';
import RegisterContainer from '../features/User/Register/container/RegisterContainer';
import MyPage from '../pages/User/MyPage';
import { LoginContainer } from '../features/User/login/container/LoginContainer';
import UserEditContainer from '../features/User/mypage/container/UserEditContainer';

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypageEdit" element={<UserEditContainer />} />
      <Route path="/postproduct" element={<PostProductPage />} />
    </Routes>
  );
};
