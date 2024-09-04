import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import RegisterContainer from '../features/User/Register/container/RegisterContainer';
import { LoginContainer } from '../features/User/login/container/LoginContainer';
import UserEditContainer from '../features/User/mypage/container/UserEditContainer';
import MyPageContainer from '../features/User/mypage/container/MyPageContainer';
import Header from '../shared/Header';
import PostProductContainer from '../features/Product/PostProduct/container/PostProductContainer';
import ProductDetailPage from '../pages/Product/ProductDetail/ProductDetailPage';
import PageNotFound from '../pages/PageNotFound';

export const RootRouter = () => {
  const location = useLocation();

  // 헤더를 표시할 경로를 정의합니다.
  const showHeaderPaths = ['/', '/mypage', '/postproduct', '/productdetail'];
  return (
    <>
      {showHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="/mypage" element={<MyPageContainer />} />
        <Route path="/mypageEdit" element={<UserEditContainer />} />
        <Route path="/postproduct" element={<PostProductContainer />} />
        <Route path="/productdetail" element={<ProductDetailPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
