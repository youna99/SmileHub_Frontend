import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
export default function MainPage() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    const getProductList = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${REACT_APP_API_URL}/product/list?page=${page}&limit=${limit}`,
        );

        const newProductInfo = res.data.productInfo;
        console.log('New Product Info:', newProductInfo);

        setProductList((prevProductList) => {
          const existingIds = new Set(
            prevProductList.map((item) => item.productId),
          );

          const updatedList = [
            ...prevProductList,
            ...newProductInfo.filter(
              (newItem) => !existingIds.has(newItem.productId),
            ),
          ];

          console.log('Updated Product List:', updatedList);
          return updatedList;
        });
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProductList();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderProduct = (productInfo) => (
    <div
      key={productInfo.productId}
      className="flexcard back w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5  p-3"
    >
      <Link to={`/product/read?productId=${productInfo.productId}`}>
        <div
          className="flex  md:w-80w-full  flex-col bg-white border border-coolGray-100 shadow-dashboard rounded-md 
          h-auto shadow-lg hover:shadow-xl overflow-hidden transform origin-bottom transition duration-400 ease-in 
          min-w-60 relative"
        >
          <h2 className="tracking-tight text-gray-900 text-lg font-bold hover:underline block mb-2">
            {productInfo.productId}번
          </h2>
          <div className="flex flex-col justify-center items-start px-4 pt-4 pb-4">
            <h2 className="tracking-tight text-gray-900 text-lg font-bold hover:underline block mb-2">
              상품 이름 : {productInfo.productName}
            </h2>
            <h3 className="mt-2 text-sm text-gray-700 line-clamp-3">
              상품 내용 :{' '}
              {productInfo.content.length > 100
                ? `${productInfo.content.slice(0, 100)}...`
                : productInfo.content}
            </h3>
            <div className="border-t border-gray-300 pt-2 mt-2 w-full">
              <div className="items-center text-gray-400 text-xs mt-1">
                <span className="font-medium text-gray-400 text-sm">
                  닉네임 : {productInfo.nickname}
                </span>
                <span>
                  날짜 :{new Date(productInfo.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <>
      <h1>메인페이지</h1>
      <div className="flex flex-wrap min-h-screen m-5">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-900">{error}</p>}
        {productList.map(renderProduct)}
      </div>
    </>
  );
}
