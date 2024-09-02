import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import PostProductPage from '../features/Product/PostProduct/container/PostProductPage';
import RegisterContainer from '../features/User/Register/container/RegisterContainer';

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/postproduct" element={<PostProductPage />} />
    </Routes>
  );
};
