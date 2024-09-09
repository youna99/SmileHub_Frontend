import React, { useState, useEffect } from 'react';
import ProductSearchForm from '../components/ProductSearchForm';
import ProductList from '../components/ProductList';
import { useSelector } from 'react-redux';

const ProductTabPage = () => {
  const products = useSelector((state) => state.productTab.products);
  const [searchResults, setSearchResults] = useState(products);
  const [currentFilteredResults, setCurrentFilteredResults] =
    useState(products); // 현재 필터링된 결과

  useEffect(() => {
    setSearchResults(products);
    setCurrentFilteredResults(products); // Redux 상태가 변경될 때 searchResults와 currentFilteredResults 모두 업데이트
  }, [products]);

  // 검색 기능
  const handleSearch = ({ searchType, value, includeSoldOut }) => {
    const filtered = products.filter((product) => {
      const matchSearch =
        searchType === 'name'
          ? product.name.includes(value)
          : searchType === 'seller'
            ? product.seller.includes(value)
            : product.id.toString().includes(value);

      const matchStatus = includeSoldOut || product.status === '판매중';
      return matchSearch && matchStatus;
    });
    setSearchResults(filtered);
    setCurrentFilteredResults(filtered);
  };

  // 체크박스 클릭 시 검색된 결과에서 필터링
  const handleStatusChange = (includeSoldOut) => {
    const filtered = searchResults.filter((product) => {
      return includeSoldOut || product.status === '판매중';
    });
    setCurrentFilteredResults(filtered); // 현재 검색된 결과에서 필터링
  };

  // 초기화
  const handleReset = () => {
    setSearchResults(products);
    setCurrentFilteredResults(products);
  };

  return (
    <div>
      {/* 검색 폼에 onSearch와 onReset 전달 */}
      <ProductSearchForm
        onSearch={handleSearch}
        onReset={handleReset}
        onStatusChange={handleStatusChange}
      />

      {/* 검색 결과 리스트 */}
      <ProductList searchResults={currentFilteredResults} />
    </div>
  );
};

export default ProductTabPage;
