import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/User/LoginPage';
import MainPage from '../pages/MainPage';
import PostProductPage from '../pages/Product/PostProduct/PostProductPage';

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/postproduct" element={<PostProductPage />} />
    </Routes>
  );
};
