import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductTab from './ProductTab';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // 스타일 import
import { Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

import '../../../App.css';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 오류 상태 추가
  const [isLiked, setIsLiked] = useState(false); // 찜 상태 관리

  const productId = new URLSearchParams(window.location.search).get(
    'productId',
  );
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const checkLikes = async () => {
    setIsLiked(!isLiked); // 찜 상태 토글
  };
  const updateClick = () => {
    navigate(`/product/update?productId=${productId}`, {
      state: { productId },
    });
  };
  const deleteClick = async () => {
    const confirmDelete = window.confirm('정말로 이 상품을 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await axios.delete(
          `${REACT_APP_API_URL}/product/delete?productId=${productId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        alert('상품이 성공적으로 삭제되었습니다.');
        navigate('/');
      } catch (error) {
        console.error('상품 삭제 중 오류 발생:', error);
        alert('로그인 유저와 작성자가 일치하지 않습니다.');
      }
    }
  };
  const handlePayment = () => {
    navigate('/mypage/payment', { state: { productId, product } });
  };
  const handleClickChat = () => {
    navigate('/chat', { state: { productId } });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_URL}/product/read?productId=${productId}`,
        );
        setProduct(response.data); // 응답 데이터 저장
        console.log('data: ', response.data);
      } catch (error) {
        console.error('상품 데이터를 가져오는 중 오류 발생:', error);
        setError('해당 상품 아이디는 없는 아이디입니다. ');
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="product-detail p-6 max-w-3xl mx-auto space-y-6">
      <section className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
        <div className="w-full sm:w-1/2 aspect-w-1 aspect-h-1">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
          >
            {product.images && product.images.length > 0 ? (
              product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`상품 이미지 ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </SwiperSlide>
              ))
            ) : (
              <p className="text-center">이미지가 없습니다.</p>
            )}
          </Swiper>
        </div>

        <div className="flex flex-col space-y-4 sm:w-1/2">
          <div className="flex justify-between mb-1">
            <button
              className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-[#FEE715] hover:text-black transition"
              onClick={updateClick}
            >
              수정
            </button>
            <button
              className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-red-500 hover:text-white transition"
              onClick={deleteClick}
            >
              삭제
            </button>
          </div>
          <hr />
          <h1 className="product-title text-2xl font-bold text-center mb-8 sm:text-3xl">
            {product.productName}
          </h1>
          <div>
            {/* 가격 및 상태 */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                가격: {product.price} 원
              </span>
              <span className="bg-green-500 text-white px-4 py-1 rounded">
                {product.status}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:pt-24">
            {/* 위치 정보 */}
            <p className="text-gray-700 pb-2 sm:pb-5">
              {product.location
                ? `${product.location.depth1} ${product.location.depth2} ${product.location.depth3}`
                : '위치 정보 없음'}
            </p>

            {/* 버튼 부분 */}
            <div className="flex justify-between items-center space-x-4 sm:space-x-2">
              <div className="flex items-center">
                <button
                  className="text-red-500 hover:text-red-700 transition duration-300"
                  onClick={checkLikes}
                >
                  <FontAwesomeIcon
                    icon={isLiked ? solidHeart : regularHeart}
                    size="1x"
                  />
                </button>
                <span className="ml-1">{product.totalLikes}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-[#FEE715] text-black px-4 py-2 rounded hover:bg-black hover:text-[#FEE715] transition"
                  onClick={handleClickChat}
                >
                  채팅
                </button>
                <button
                  className="bg-[#f3b105] text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  onClick={handlePayment}
                >
                  안전구매
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <hr className="pb-5" />
        <p className="text-gray-700">{product.content}</p>
      </section>

      <ProductTab />
    </div>
  );
};

export default ProductDetail;
