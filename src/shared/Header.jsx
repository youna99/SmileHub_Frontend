import React from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/User/store/userSlice';
import { persistor, store } from '../app/rootStore';

export default function Header() {
  const profileImage = useSelector(
    (state) => state.user.currentUser.profileImage,
  );
  const isAuthenticated = useSelector(
    (state) => state.user.currentUser.isAuthenticated,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <nav>
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            SeSAC-2st
          </span>
        </Navbar.Brand>
        {isAuthenticated ? (
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              // label={<Avatar alt="User profile" img={profileImage} rounded />}
              label={
                <Avatar
                  alt="User profile"
                  img={profileImage ? profileImage : '/images/profile.png'}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">UserName</span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link to="/mypage">마이페이지</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={handleLogout}>로그아웃</button>
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        ) : (
          <Link
            to="/login"
            className="text-sm text-gray-700 hover:text-gray-900"
          > 
            로그인/회원가
          </Link>
            <Dropdown.Header>
              <span className="block text-sm">UserName</span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/login">Login</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/mypage">Mypage</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active>
            홈
          </Navbar.Link>
          <Navbar.Link href="/">판매글쓰기</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
}
