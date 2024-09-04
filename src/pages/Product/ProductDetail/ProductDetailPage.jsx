import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // 스타일 import
import { Navigation, Pagination } from 'swiper/modules';

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
      <div className="flex flex-col max-w-5xl">
        <div className="flex flex-col px-11 py-7 w-full bg-zinc-300 max-md:px-5 max-md:max-w-full">
          <div className="max-w- w-[724px]">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
                <section>
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
              </div>
              {/* <div className="flex flex-col ml-5 w-[56%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col mt-3.5 w-full text-3xl text-black max-md:mt-9">
                  <div className="flex flex-col pl-5">
                    <ul className="cinematic-list">
                      <li>상품 정보</li>
                      <br />
                      <li>판매자 정보</li>
                      <br />
                      <li>평점</li>
                      <br />
                      <li>상품 상세 정보</li>
                      <br />
                      <li>작성한 글 내용</li>
                    </ul>
                  </div>
                  <div className="flex gap-5 justify-between mt-24 max-w-full whitespace-nowrap w-[323px] max-md:mt-10">
                    <div>찜</div>
                    <div className="flex gap-1.5">
                      <div className="grow">조회수</div>
                      <div className="basis-auto">신고하기</div>
                    </div>
                  </div>
                </div>
              </div> */}

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
                  <button className="bg-red-400 text-white px-4 py-2 rounded shadow hover:bg-yellow-600">
                    채팅
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">
                    안전구매
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-10 px-7 py-8 mt-5 text-3xl text-black bg-zinc-300 max-md:px-5">
          <div>새상품 최저가</div>
          <div className="grow shrink w-[118px]">새상품 리뷰</div>
          <div className="grow shrink w-[605px] max-md:max-w-full">
            거래후기
          </div>
        </div>
      </div>
    </main>
  );
}
