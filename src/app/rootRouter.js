import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/User/LoginPage';
import MainPage from '../pages/MainPage';
import PostPruductPage from '../pages/Product/PostProductPage';

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/postproduct" element={<PostPruductPage />} />
    </Routes>
  );
};
