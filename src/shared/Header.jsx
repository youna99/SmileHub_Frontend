import React, { useEffect, useState } from 'react';
import { Navbar } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/User/store/userSlice';
import { persistor, store } from '../app/rootStore';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 프로필 이미지 토글 상태
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 메뉴 토글 상태
  const profileImage = useSelector(
    (state) => state.user.currentUser.profileImage,
  );
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAuthenticated = useSelector(
    (state) => state.user.currentUser.isAuthenticated,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // 로그아웃
  const handleLogout = async () => {
    dispatch(logout()); // 상태 초기화
    try {
      await persistor.purge(); // Redux 상태 제거
      console.log('Local storage purged');

      // 상태 확인
      const state = store.getState();
      console.log('State after logout:', state);

      // 토큰 제거
      localStorage.removeItem('token');
      console.log('Token removed from local storage');
      navigate('/');
    } catch (error) {
      console.error('Error purging local storage', error);
    }
  };

  // 기본 프로필 이미지
  const defaultUrl =
    'https://sesac-2nd-pro-bucket.s3.ap-northeast-2.amazonaws.com/null';

  useEffect(() => {
    if ((location.pathname === '/mypage', '/logout', '/', '/product/write')) {
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
    }
  }, [location]);

  return (
    <nav>
      <Navbar fluid rounded className="bg-gray-50">
        <Navbar.Brand href="/">
          <span className="flex flex-col self-center whitespace-nowrap dark:text-white">
            <img src="/images/logo.png" alt="logo" className="w-10 sm:w-12" />
          </span>
          <span className="text-xl font-bold mx-2">Smile Hub</span>
        </Navbar.Brand>

        {/* 데스크탑 메뉴를 가운데로 옮기기 */}
        <div className="hidden md:flex justify-center flex-1 space-x-4">
          <Link
            to="/"
            className="font-semibold text-gray-700 hover:text-yellow-500"
          >
            홈
          </Link>
          <Link
            to="/product/write"
            className="font-semibold text-gray-700 hover:text-yellow-500"
          >
            판매글쓰기
          </Link>
        </div>

        <div className="flex md:order-2 relative ml-auto">
          {isAuthenticated ? (
            <>
              <button className="flex items-center" onClick={toggleDropdown}>
                <img
                  alt="User profile"
                  src={
                    profileImage === defaultUrl
                      ? '/images/profile.png'
                      : profileImage
                  }
                  rounded
                  className="w-12 sm:w-16"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-11 sm:mt-14 w-40 bg-white rounded-md shadow-lg z-10">
                  <div className="px-4 py-2">
                    <span className="block text-sm">
                      {currentUser.nickname}
                    </span>
                    <hr className="mt-2" />
                  </div>

                  {/* 관리자 페이지 링크 추가 */}
                  {currentUser.isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      관리자 페이지
                    </Link>
                  )}

                  <Link
                    to="/mypage"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    마이페이지
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="font-semibold text-gray-700 hover:text-yellow-500"
            >
              로그인/회원가입
            </Link>
          )}
        </div>

        {/* 모바일 메뉴 아이콘 */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu}>
            <img src="/images/nav.png" alt="Menu" className="w-8 h-8" />
          </button>
        </div>

        {/* 모바일 메뉴 토글 */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute right-0 mt-28 mr-2 w-40 bg-white rounded-md border z-10">
            <Link
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              홈
            </Link>
            <Link
              to="/product/write"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              판매글쓰기
            </Link>
          </div>
        )}
      </Navbar>
    </nav>
  );
}

export default Header;
