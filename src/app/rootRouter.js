import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import RegisterContainer from '../features/User/container/RegisterContainer';
import { LoginContainer } from '../features/User/container/LoginContainer';

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};
