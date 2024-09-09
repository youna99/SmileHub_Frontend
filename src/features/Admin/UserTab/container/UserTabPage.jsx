import React, { useState, useEffect } from 'react';
import UserSearchForm from '../components/UserSearchForm';
import UserList from '../components/UserList';
import { useSelector } from 'react-redux';

const UserTabPage = () => {
  const users = useSelector((state) => state.userTab.users);
  const [searchResults, setSearchResults] = useState(users);
  const [currentFilteredResults, setCurrentFilteredResults] = useState(users); // 라디오 필터링된 결과

  useEffect(() => {
    setSearchResults(users);
    setCurrentFilteredResults(users); // Redux 상태가 업데이트될 때 searchResults와 currentFilteredResults도 업데이트
  }, [users]);

  // 검색 기능
  const handleSearch = ({ searchType, value, status }) => {
    const filtered = users.filter((user) => {
      const matchSearch =
        searchType === 'nickname'
          ? user.nickname.includes(value)
          : user.email.includes(value);
      const matchStatus = status === '전체' || user.status === status;
      return matchSearch && matchStatus;
    });
    setSearchResults(filtered);
    setCurrentFilteredResults(filtered);
  };

  // 라디오 버튼 클릭 시 필터링
  const handleStatusChange = (newStatus) => {
    const filtered = searchResults.filter((user) => {
      return newStatus === '전체' || user.status === newStatus;
    });
    setCurrentFilteredResults(filtered); // 검색된 결과에서 필터링
  };

  // 초기화
  const handleReset = () => {
    setSearchResults(users);
    setCurrentFilteredResults(users);
  };
  return (
    <div>
      <UserSearchForm
        onSearch={handleSearch}
        onReset={handleReset}
        onStatusChange={handleStatusChange}
      />
      <UserList searchResults={currentFilteredResults} />
    </div>
  );
};

export default UserTabPage;
