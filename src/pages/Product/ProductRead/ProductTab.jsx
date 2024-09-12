import React, { useRef } from 'react';
import PostComment from './PostComment';

const ProductTab = (newItem) => {
  const newProductPriceRef = useRef(null); // 새상품 최저가
  const newProductReviewRef = useRef(null); // 거래후기
  const userReviewRef = useRef(null); // 새상품 리뷰

  const handleScrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // console.log(
  //   'newItem >> ',
  //   newItem.newItem.map((i, v) => console.log(i.title)),
  // );

  return (
    <div className="container mx-auto">
      <div className="flex justify-evenly flex-wrap gap-5 sm:gap-10 px-5 sm:px-7 py-4 sm:py-8 mt-5 text-xl font-semibold sm:text-2xl text-black bg-zinc-100 rounded-lg">
        <div
          onClick={() => handleScrollTo(newProductPriceRef)}
          className="cursor-pointer hover:text-[#f3b105] transition duration-300"
        >
          새상품 최저가
        </div>
        <div
          onClick={() => handleScrollTo(userReviewRef)}
          className="cursor-pointer hover:text-[#f3b105] transition duration-300"
        >
          거래후기
        </div>
      </div>

      <div ref={newProductPriceRef} className="py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          해당 상품과 연관된 상품입니다.
        </h2>
        <div className="mt-2 space-y-6">
          {newItem && newItem.newItem.length > 0 ? (
            newItem.newItem.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                >
                  상품명:{' '}
                  {item.title.split('<b>').join('').split('</b>').join('')}{' '}
                  {/* <b> 태그 제거 */}
                </a>
                <p className="text-gray-700 mt-1">
                  가격: <span className="font-bold">{item.lprice} 원</span>
                </p>
                <p className="text-gray-500">상점명: {item.mallName}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              새 상품에 대한 정보가 없습니다.
            </p>
          )}
        </div>

        <hr className="mt-2" />
      </div>
      <div ref={userReviewRef} className="py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          거래후기
        </h2>
        <p className="mt-2 text-gray-600">
          여기에 거래 후기 내용이 들어갑니다.
        </p>
        <hr className="mt-2" />

        {/* 댓글 작성 폼 */}
        <PostComment />

        {/* 댓글 내역 */}
        {/* <CommentSection /> */}
      </div>
    </div>
  );
};

export default ProductTab;
