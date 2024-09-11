import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // 스타일 import
import { Navigation, Pagination } from 'swiper/modules';
import ProductTab from './ProductTab';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

export default function ProductDetailPage() {
  //   const [images, setImages] = useState([]);
  const [fetchProduct, setFetchProduct] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 오류 상태 추가
  const [isLiked, setIsLiked] = useState(false); // 찜 상태 관리

  const toggleLike = () => {
    setIsLiked(!isLiked); // 찜 상태 토글
  };
  const productId = 19;
  const images = [
    '/images/1.png',
    '/images/2.png',
    '/images/3.png',
    // 추가 이미지 경로
  ];

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/product/read?productId=${productId}`,
        );
        setFetchProduct(res.data);
        console.log('fetchProductDetail data ->', res.data);
      } catch (error) {
        setError(error.message); // 오류 메시지를 상태에 저장
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };
    fetchProductDetail();
  }, [productId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 오류가 발생했을 때
  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  return (
    <main>
      <div className="flex flex-col max-w-fulll">
        <div className="flex flex-col px-11 py-7 w-full bg-white max-md:px-5 max-md:max-w-full">
          <div className="max-w- w-[724px]">
            <div className="flex gap-5 max-md:flex-col">
              <section className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
                <div className="w-full aspect-square bg-zinc-100 max-md:px-5 max-md:pb-24 max-md:mt-5">
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]} // modules 속성 추가
                  >
                    {images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          alt={`상품 이미지 ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </section>
              <div className="p-4">
                <h1 className="text-xl font-bold mb-2">
                  {fetchProduct.productName}
                </h1>
                <p className="text-lg font-semibold mb-2">
                  {fetchProduct.price} 원
                </p>
                <hr />
                <div className="flex items-center mb-2">
                  <span className="text-gray-500">5일 전</span>
                </div>
                <div className="flex justify-evenly">
                  <button
                    onClick={toggleLike}
                    className="text-red-500 hover:text-red-700 transition-all duration-300"
                  >
                    <FontAwesomeIcon
                      icon={isLiked ? solidHeart : regularHeart}
                      size="2x"
                    />
                  </button>
                  <button className="bg-[#FEE715] text-[#101820] px-4 py-2 rounded shadow hover:bg-yellow-600">
                    채팅
                  </button>
                  <button className="bg-[#f3b105] text-[#ffefbc] py-2 rounded shadow hover:bg-red-600">
                    안전구매
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductTab />
      </div>
    </main>
  );
}
