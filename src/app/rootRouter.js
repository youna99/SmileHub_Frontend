import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import PostProductPage from '../features/Product/PostProduct/container/PostProductPage';
import RegisterContainer from '../features/User/Register/container/RegisterContainer';
import { LoginContainer } from '../features/User/login/container/LoginContainer';
import UserEditContainer from '../features/User/mypage/container/UserEditContainer';
import MyPageContainer from '../features/User/mypage/container/MyPageContainer';
import PaymentPage from '../pages/Payment/PaymentPage';
import ChatPage from '../pages/Chat/ChatPage';
import AdminPage from '../pages/Admin/AdminPage';

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/mypage" element={<MyPageContainer />} />
      <Route path="/mypageEdit" element={<UserEditContainer />} />
      <Route path="/postproduct" element={<PostProductPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/chat/:roomId" element={<ChatPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};
