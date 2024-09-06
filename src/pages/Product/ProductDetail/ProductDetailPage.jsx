import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // 스타일 import
import { Navigation, Pagination } from 'swiper/modules';
import ProductTab from './ProductTab';

export default function MyComponent() {
  //   const [images, setImages] = useState([]);

  const images = [
    '/images/1.png',
    '/images/2.png',
    '/images/3.png',
    // 추가 이미지 경로
  ];

  //   useEffect(() => {
  //     const fetchImages = async () => {
  //       try {
  //         const response = await fetch('https://your-api-url.com/images'); // 이미지 API URL
  //         const data = await response.json();
  //         setImages(data.images); // 응답 데이터에서 이미지 배열을 설정
  //       } catch (error) {
  //         console.error('이미지 불러오기 실패:', error);
  //       }
  //     };

  //     fetchImages();
  //   }, []);

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
                  버버리브릿 여성 카라넥 체크 반팔티셔츠 M
                </h1>
                <p className="text-lg font-semibold mb-2">58,000 원</p>
                <hr />
                <div className="flex items-center mb-2">
                  <span className="text-gray-500">5일 전</span>
                </div>
                <div className="flex justify-evenly">
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
