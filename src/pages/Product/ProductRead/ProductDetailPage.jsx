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

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [fetchProduct, setFetchProduct] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 오류 상태 추가
  const [isLiked, setIsLiked] = useState(false); // 찜 상태 관리

  const productId = new URLSearchParams(window.location.search).get(
    'productId',
  );

  const toggleLike = () => {
    setIsLiked(!isLiked); // 찜 상태 토글
  };

  const navigate = useNavigate();

  const handlePayment = (productId) => {
    navigate('/mypage/payment', { state: { productId } });
  };

  const handleClickChat = (productId) => {
    navigate('/chat', { state: { productId } });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/product/read?productId=${productId}`,
        );
        setProduct(response.data); // 응답 데이터 저장
      } catch (error) {
        console.error('상품 데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (!product) {
    return <div className="error">상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="product-detail">
      <h1 className="product-title ">{product.productName}</h1>
      <section className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
        <div className="w-full aspect-square bg-zinc-100 max-md:px-5 max-md:pb-24 max-md:mt-5">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]} // modules 속성 추가
          >
            {product.images && product.images.length > 0 ? (
              // {images.map((image, index) => (
              product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    key={index}
                    src={image}
                    alt={`상품 이미지 ${index + 1}`}
                    className="product-image"
                  />
                </SwiperSlide>
              ))
            ) : (
              <p>이미지가 없습니다.</p>
            )}
          </Swiper>
        </div>
      </section>
      <section className="content border-2 border-purple border-solid">
        <div>
          <span className="product-price">가격: {product.price} 원</span>
          &nbsp;&nbsp;
          <span className="product-status bg-[#FEE715] rounded shadow ">
            {product.status}
          </span>
        </div>
        <p className="product-location">
          위치:{' '}
          {product.location
            ? `${product.location.depth1} ${product.location.depth2} ${product.location.depth3}`
            : '위치 정보 없음'}
        </p>
        {/* <p className="product-view-count">조회수: {product.viewCount}</p> */}
        <div className="flex justify-evenly">
          <button
            onClick={toggleLike}
            className="text-red-500 hover:text-red-700 transition-all duration-300"
          >
            <FontAwesomeIcon
              icon={isLiked ? solidHeart : regularHeart}
              size="2x"
            />
            {product.totalLikes}
          </button>
          <button
            className="bg-[#FEE715] text-[#101820] px-4 py-2 rounded shadow hover:bg-yellow-600"
            onClick={() => handleClickChat(productId)}
          >
            채팅
          </button>
          <button
            className="bg-[#f3b105] text-[#ffefbc] py-2 rounded shadow hover:bg-red-600"
            onClick={() => handlePayment(productId)}
          >
            안전구매
          </button>
        </div>
        <p className="product-reports">
          이 판매자의 신고 수: {product.totalReport}
        </p>
        <p className="product-created-at">
          등록일: {new Date(product.createdAt).toLocaleDateString()}
        </p>
      </section>
      <section>
        <p className="product-description">{product.content}</p>
      </section>
      <ProductTab />
    </div>
  );
};

export default ProductDetail;
