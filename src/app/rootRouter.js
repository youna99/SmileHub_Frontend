import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/User/LoginPage';
import MainPage from '../pages/MainPage';

export const RootRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MainPage />} />
        </Routes>
    );
};
