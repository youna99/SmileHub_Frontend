import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/User/LoginPage';
import MainPage from '../pages/MainPage';
import RegisterContainer from '../features/User/Register/container/RegisterContainer';

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};
